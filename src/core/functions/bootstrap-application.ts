import { applicationConfig } from "../interfaces/application-config";
import { AppConstructor } from "../types/types";
import { registerRoutes } from "./register-routes";

export function bootstrapApplication (APP:AppConstructor,appConfig : applicationConfig){
  const app = new APP(appConfig.cors, appConfig.httpErrorHandler,appConfig.limiter,appConfig.middlewares);
  registerRoutes(app,appConfig.routes);
  return app
}