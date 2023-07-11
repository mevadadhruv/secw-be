import roleModel from '../models/role.model';
import { Role } from '../types/userTypes';
import { IRoleRepository } from '../interfaces/IRoleRepository';
import { injectable } from 'inversify';
import appError from '../Error/appError';
import mongoose from 'mongoose';
const mongooseTypes = mongoose.Types;
@injectable()
export default class RoleRepository implements IRoleRepository {
	async addRole(name: string): Promise<Role> {
		try {
			const addRole = await roleModel.create({
				name: name
			});
			console.log('add role', addRole);
			return addRole;
		} catch (err) {
			console.log('error in add role repository :-', err);
			throw new Error('error in add role repository' + err);
		}
	}

	async getRoleById(id: string): Promise<Role> {
		try {
			const getRole = await roleModel.findById(id);
			return getRole;
		} catch (err) {
			console.log('error in get role repository :-', err);
			throw new Error('error in get role repository' + err);
		}
	}
	async getRoles(): Promise<Role[]> {
		try {
			const getRoles = await roleModel.find();
			return getRoles;
		} catch (err) {
			console.log('error in get roles repository :-', err);
			throw new Error('error in get roles repository' + err);
		}
	}
	async updateRole(id: string, name: string): Promise<Role> {
		try {
			const getRole = await this.getRoleById(id);
			if (!getRole) {
				throw new appError('Record Not Found in Role', 400);
			}
			const _id = new mongooseTypes.ObjectId(id);
			console.log('update id:', _id);
			const updateRole = await roleModel.findByIdAndUpdate({ _id }, { name: name });
			return updateRole;
		} catch (err) {
			if (err instanceof appError) {
				throw err;
			}
			console.log('error in update role repository :-', err);
			throw new Error('error in update role repository' + err);
		}
	}
	async deleteRole(id: string): Promise<Role> {
		try {
			const getRole = await this.getRoleById(id);
			if (!getRole) {
				throw new appError('Record Not Found in Role', 400);
			}
			const deleteRole = await roleModel.findByIdAndDelete(id);
			return deleteRole;
		} catch (err) {
			if (err instanceof appError) {
				throw err;
			}
			console.log('error in delete role repository :-', err);
			throw new Error('error in delete role repository' + err);
		}
	}
}
