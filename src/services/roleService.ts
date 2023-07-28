import { inject, injectable } from 'inversify';
import { IRoleService } from '../interfaces/IRoleService';
import { role } from '../types/userTypes';
import { IRoleRepository } from '../interfaces/IRoleRepository';
import { types } from '../config/types';

@injectable()
export default class RoleService implements IRoleService {
	private _roleRepository: IRoleRepository;

	constructor(@inject(types.IRoleRepository) roleRepository: IRoleRepository) {
		this._roleRepository = roleRepository;
	}

	async addRole(name: string): Promise<role> {
		try {
			const addRole = await this._roleRepository.addRole(name);
			return addRole;
		} catch (err) {
			console.log("inside service add role", err);
            throw new Error("inside service add role" + err);
		}
	}

	async getRoleById(id: string): Promise<role> {
		try {
			const getRole = this._roleRepository.getRoleById(id);
			return getRole;
		} catch (err) {
			console.log("inside service get role", err);
            throw new Error("inside service get role" + err);
		}
	}

	async getRoles(): Promise<role[]> {
		try {
			const getRoles = this._roleRepository.getRoles();
			return getRoles;
		} catch (err) {
			console.log("inside service get roles", err);
            throw new Error("inside service get roles" + err);
		}
	}

	async updateRole(id: string, name: string): Promise<role> {
		try {
			const UpdateRole = await this._roleRepository.updateRole(id, name);
			return UpdateRole;
		} catch (err) {
			console.log("inside service update role", err);
            throw new Error("inside service update role" + err);
		}
	}

	async deleteRole(id: string): Promise<role> {
		try {
			const deleteRole = await this._roleRepository.deleteRole(id);
			return deleteRole;
		} catch (err) {
			console.log("inside service delete role", err);
            throw new Error("inside service delete role" + err);
		}
	}
}