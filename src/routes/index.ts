import router from "../routes/userRoutes";
import profileRouter from "./profileRoutes";
import FAuthRouter from "./fAuthRoutes";
import GAuthRoutes from "./gAuthRoutes";
import DocumentRouter from "./documentRoutes";
import VendorRouter from "./vendorRoutes";
import VendorUserRouter from "./vendorUserRoutes";
import roleRouter from "./roleRoutes";

export default {
  router,
  profileRouter,
  DocumentRouter,
  VendorRouter,
  VendorUserRouter,
  roleRouter,
  GAuthRoutes,
  FAuthRouter,
};
