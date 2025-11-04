import {
  Action,
  actions,
  Permission,
  Resource,
  resources,
} from "@/shared/entities/permissions";

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
