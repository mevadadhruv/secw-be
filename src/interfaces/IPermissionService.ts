import { Permission } from "../types/userTypes";

export interface IPermissionService {
  addPermission(name: string, description: string): Promise<Permission>;
  getPermissionById(id: string): Promise<Permission>;
  getPermissions(): Promise<Permission[]>;
  updatePermission(
    id: string,
    name: string,
    description: string
  ): Promise<Permission>;
  deletePermission(id: string): Promise<Permission>;
}
