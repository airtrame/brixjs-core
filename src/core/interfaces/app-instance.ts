import { Express } from 'express';
import { RouterMethods } from './router-methods';
import { HttpErrorHandler } from '../classes/http-error-handler';
import { CorsOptions } from 'cors';
import { Middleware } from '../types/types';
export interface AppInstance {
  app: Express;
  prefix: string;
  router: RouterMethods;
  setPrefix(prefix: string): void;
  httpErrorHandler: HttpErrorHandler | undefined;
  initialCorsOptions?: CorsOptions;
  middlewares: Middleware<any, any, any, any>[];
  current_middlewares: Middleware<any, any, any>[];
  setCors(corsOptions: CorsOptions | undefined): void
  setMiddlewares(middlewares: Middleware[]): void
}