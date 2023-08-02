import { role } from "../types/userTypes";

export interface IRoleService {
  addRole(name: string): Promise<role>;
  getRoleById(id: string): Promise<role>;
  getRoles(): Promise<role[]>;
  updateRole(id: string, name: string): Promise<role>;
  deleteRole(id: string): Promise<role>;
}
