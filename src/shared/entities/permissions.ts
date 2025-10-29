export const resources = [
  "employees",
  "groups",
  "products",
  "providers",
  "clients",
  "businesses",
] as const;
export const actions = ["create", "read", "update", "delete"] as const;

export type Resource = (typeof resources)[number];
export type Action = (typeof actions)[number];

export type Permission = `${Resource}:${Action}`;

export const allPermission: Permission[] = [
  "employees:create",
  "employees:read",
  "employees:update",
  "employees:delete",

  "groups:create",
  "groups:read",
  "groups:update",
  "groups:delete",

  "products:create",
  "products:read",
  "products:update",
  "products:delete",

  "providers:create",
  "providers:read",
  "providers:update",
  "providers:delete",

  "clients:create",
  "clients:read",
  "clients:update",
  "clients:delete",
] as const;

export const resourceEs = new Map<Resource, string>([
  ["employees", "Empleados"],
  ["groups", "Grupos"],
  ["products", "Productos"],
  ["providers", "Proveedores"],
  ["clients", "Clientes"],
  ["businesses", "Negocios"],
]);

export const actionEs = new Map<Action, string>([
  ["create", "Crear"],
  ["read", "Leer"],
  ["update", "Actualizar"],
  ["delete", "Eliminar"],
]);

export function translatePermission(permission: Permission) {
  const [resource, action] = permission.split(":") as [Resource, Action];

  if (!resources.includes(resource)) {
    throw new Error(`Invalid resource: ${resource}`);
  }

  if (!actions.includes(action)) {
    throw new Error(`Invalid action: ${action}`);
  }

  return {
    resource,
    action,
    es: `${actionEs.get(action)} ${resourceEs.get(resource)} `,
  };
}
