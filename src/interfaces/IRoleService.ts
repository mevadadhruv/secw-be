import { Role } from '../types/userTypes';

export interface IRoleService {
	addRole(name: string): Promise<Role>;
	getRoleById(id: string): Promise<Role>;
	getRoles(): Promise<Role[]>;
	updateRole(id: string, name: string): Promise<Role>;
	deleteRole(id: string): Promise<Role>;
}
