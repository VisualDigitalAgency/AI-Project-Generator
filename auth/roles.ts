// auth/roles.ts

export type Role = "admin" | "user" | "viewer" | "service";

// Permissions are JSON-RPC method patterns. "*" = all methods.
// Add domain-specific permissions for your project.
const PERMISSIONS: Record<Role, string[]> = {
  admin:   ["*"],
  user:    ["resource.*", "auth.me", "auth.logout", "auth.refresh"],
  viewer:  ["resource.list", "resource.get", "auth.me"],
  service: ["resource.*"],   // internal service-to-service calls
};

export function can(role: Role, method: string): boolean {
  const perms = PERMISSIONS[role] ?? [];
  return perms.some((p) => p === "*" || p === method || (p.endsWith(".*") && method.startsWith(p.slice(0, -2))));
}

export function getRolePermissions(role: Role): string[] {
  return PERMISSIONS[role] ?? [];
}
