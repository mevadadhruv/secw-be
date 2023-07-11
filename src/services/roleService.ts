import { inject, injectable } from 'inversify';
import { IRoleService } from '../interfaces/IRoleService';
import { Role } from '../types/userTypes';
import { IRoleRepository } from '../interfaces/IRoleRepository';
import { types } from '../config/types';

@injectable()
export default class RoleService implements IRoleService {
	private _roleRepository: IRoleRepository;

	constructor(@inject(types.IRoleRepository) roleRepository: IRoleRepository) {
		this._roleRepository = roleRepository;
	}

	async addRole(name: string): Promise<Role> {
		try {
			const addRole = await this._roleRepository.addRole(name);
			return addRole;
		} catch (err) {
			throw err;
		}
	}

	async getRoleById(id: string): Promise<Role> {
		try {
			const getRole = this._roleRepository.getRoleById(id);
			return getRole;
		} catch (err) {
			throw err;
		}
	}

	async getRoles(): Promise<Role[]> {
		try {
			const getRoles = this._roleRepository.getRoles();
			return getRoles;
		} catch (err) {
			throw err;
		}
	}

	async updateRole(id: string, name: string): Promise<Role> {
		try {
			const UpdateRole = await this._roleRepository.updateRole(id, name);
			return UpdateRole;
		} catch (err) {
			throw err;
		}
	}

	async deleteRole(id: string): Promise<Role> {
		try {
			const deleteRole = await this._roleRepository.deleteRole(id);
			return deleteRole;
		} catch (err) {
			throw err;
		}
	}
}
