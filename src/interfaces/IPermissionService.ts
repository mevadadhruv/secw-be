import { permission } from "../types/userTypes";

export interface IPermissionService {
  addPermission(name: string, description: string): Promise<permission>;
  getPermissionById(id: string): Promise<permission>;
  getPermissions(): Promise<permission[]>;
  updatePermission(
    id: string,
    name: string,
    description: string
  ): Promise<permission>;
  deletePermission(id: string): Promise<permission>;
}
