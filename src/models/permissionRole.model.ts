import mongoose from "mongoose";
const permissionRoleSchema = new mongoose.Schema({
  permissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "permissionSchema",
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roleschema",
  },
});

export default mongoose.model("permissionRole", permissionRoleSchema);
