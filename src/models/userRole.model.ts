import mongoose from "mongoose";

const UserRoleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Userschema",
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoleSchmea",
  },
});

export default mongoose.model("UserRole", UserRoleSchema);
