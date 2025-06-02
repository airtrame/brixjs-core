import { CorsOptions } from "cors";
import { AppInstance } from "./app-instance";
import { IRoutes } from "./iroutes";
import { Middleware } from "../types/types";

export interface registeredRoute {
  route: new (app: AppInstance) => IRoutes
  prefix?: string,
  cors?: CorsOptions
  middlewares?: Middleware[]
}