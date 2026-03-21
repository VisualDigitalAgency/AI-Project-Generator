// auth/middleware.ts
import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, type TokenPayload } from "./jwt";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers["authorization"];
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({
      jsonrpc: "2.0",
      error: { code: -32001, message: "Missing or malformed authorization header" },
      id: null,
    });
    return;
  }

  try {
    req.user = verifyAccessToken(header.slice(7));
    next();
  } catch {
    res.status(401).json({
      jsonrpc: "2.0",
      error: { code: -32001, message: "Invalid or expired token" },
      id: null,
    });
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ jsonrpc: "2.0", error: { code: -32001, message: "Unauthorized" }, id: null });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ jsonrpc: "2.0", error: { code: -32002, message: "Forbidden" }, id: null });
      return;
    }
    next();
  };
}
