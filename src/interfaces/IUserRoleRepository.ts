export interface IUserRoleRepository {
  addUserRole(vendorId: string, userId: string): any;
  getUserRoles(): any;
  getUserRolebyId(id: string): any;
  deleteUserRole(id: string): any;
}
