export interface IPermissionRoleService {
  addPermissionRole(permissionId: string, roleId: string): any;
  getPermissionRoles(): any;
  getPermissionRolebyId(id: string): any;
  deletePermissionRole(id: string): any;
}
