// services/shared/contracts/jsonrpc.ts
// Universal JSON-RPC 2.0 types — import in every service

export interface JsonRpcRequest<T = unknown> {
  jsonrpc: "2.0";
  method: string;
  params: T;
  id: string;
}

export interface JsonRpcSuccess<T = unknown> {
  jsonrpc: "2.0";
  result: T;
  id: string;
}

export interface JsonRpcError {
  jsonrpc: "2.0";
  error: { code: number; message: string; data?: unknown };
  id: string | null;
}

export type JsonRpcResponse<T = unknown> = JsonRpcSuccess<T> | JsonRpcError;

export function success<T>(id: string, result: T): JsonRpcSuccess<T> {
  return { jsonrpc: "2.0", result, id };
}

export function error(id: string | null, code: number, message: string, data?: unknown): JsonRpcError {
  return { jsonrpc: "2.0", error: { code, message, data }, id };
}
