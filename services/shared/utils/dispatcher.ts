// services/shared/utils/dispatcher.ts
// Generic JSON-RPC 2.0 dispatcher — use in every service

import type { Request, Response } from "express";
import { type JsonRpcRequest, success, error } from "../contracts/jsonrpc";

type Handler = (params: unknown, ctx: { userId?: string; role?: string }) => Promise<unknown>;

export function createDispatcher(handlers: Record<string, Handler>) {
  return async (req: Request, res: Response): Promise<void> => {
    const body = req.body as JsonRpcRequest;

    if (body.jsonrpc !== "2.0" || !body.method || !body.id) {
      res.status(400).json(error(null, -32600, "Invalid Request"));
      return;
    }

    const handler = handlers[body.method];
    if (!handler) {
      res.status(404).json(error(body.id, -32601, `Method not found: ${body.method}`));
      return;
    }

    try {
      const ctx = { userId: (req as any).user?.sub, role: (req as any).user?.role };
      const result = await handler(body.params, ctx);
      res.json(success(body.id, result));
    } catch (err: any) {
      const code = err.code ?? -32000;
      res.status(500).json(error(body.id, code, err.message ?? "Internal error"));
    }
  };
}
