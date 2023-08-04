import router from "../routes/userRoutes";
import profileRouter from "./profileRoutes";
import fAuthRouter from "./fAuthRoutes";
import GAuthRoutes from "./gAuthRoutes";
import documentRouter from "./documentRoutes";
import VendorRouter from "./vendorRoutes";
import vendorUserRouter from "./vendorUserRoutes";
import roleRouter from "./roleRoutes";
import countryRouter from "./countryRoutes";
import permissionRouter from "./permissionRoutes";
import permissionRoleRouter from "./permissionRoleRoutes";
import categoryRouter from "./categoryRoutes";
import productRouter from "./productRoutes";
import UserRoleRouter from "./userRoleRoutes";

export default {
  router,
  profileRouter,
  DocumentRouter: documentRouter,
  VendorRouter,
  VendorUserRouter: vendorUserRouter,
  roleRouter,
  GAuthRoutes,
  FAuthRouter: fAuthRouter,
  countryRouter,
  permissionRouter,
  permissionRoleRouter,
  categoryRouter,
  productRouter,
  UserRoleRouter,
};
