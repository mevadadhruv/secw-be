import mongoose from "mongoose";
const permissionRoleSchema = new mongoose.Schema({
  permissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});

export default mongoose.model("PermissionRole", permissionRoleSchema);
