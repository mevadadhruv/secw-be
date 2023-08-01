import router from "../routes/userRoutes";
import profileRouter from "./profileRoutes";
import FAuthRouter from "./FAuthRoutes";
import GAuthRoutes from "./gAuthRoutes";
import DocumentRouter from "./documentRoutes";
import VendorRouter from "./vendorRoutes";
import VendorUserRouter from "./vendorUserRoutes";
import roleRouter from "./roleRoutes";
import countryRouter from "./countryRoutes";
import UserRoleRouter from "./userRoleRoutes";
export default {
  router,
  profileRouter,
  DocumentRouter,
  VendorRouter,
  VendorUserRouter,
  roleRouter,
  GAuthRoutes,
  FAuthRouter,
  countryRouter,
  UserRoleRouter,
};
