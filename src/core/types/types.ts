import { CorsOptions } from "cors";
import { ZodObject, ZodRawShape, z} from 'zod';
import { Express, Request, Response } from 'express';
import { RateLimitRequestHandler } from 'express-rate-limit';
import { HttpErrorHandler } from "../classes/http-error-handler";
import { RouterMethods } from "../interfaces/router-methods"; 

export type AnyZodObject = ZodObject<ZodRawShape>;

export type HandlerContext<
  TParams extends AnyZodObject | undefined,
  TBody extends AnyZodObject | undefined,
  TQuery extends AnyZodObject | undefined,
  TExtra extends Record<string, any> = any
> = {
  params: InferOrAny<TParams>;
  body: InferOrAny<TBody>;
  query: InferOrAny<TQuery>;
  req: Request;
  res: Response;
  extra?: TExtra; 
};

export type InferOrAny<T extends AnyZodObject | undefined> = T extends AnyZodObject
  ? z.infer<T>
  : any;

export type routerMethod = {
    get: <
      TParams extends AnyZodObject | undefined = undefined,
      TQuery extends AnyZodObject | undefined = undefined
    >(
      path: string,
      config: {
        schema?: {
          params?: TParams;
          query?: TQuery;
        };
        handler: (ctx: HandlerContext<TParams, undefined, TQuery>) => any;
        headers?: Record<string, string>;
        middlewares?: Middleware<any,any,any,any>[],
      }
    ) => void;
  
    post: <
      TParams extends AnyZodObject | undefined = undefined,
      TBody extends AnyZodObject | undefined = undefined
    >(
      path: string,
      config: {
        schema?: {
          params?: TParams;
          body?: TBody;
        };
        handler: (ctx: HandlerContext<TParams, TBody, undefined>) => any;
        headers?: Record<string, string>;
        middlewares?: Middleware<any,any,any,any>[],
      }
    ) => void;
  
    put: <
      TParams extends AnyZodObject | undefined = undefined,
      TBody extends AnyZodObject | undefined = undefined
    >(
      path: string,
      config: {
        schema?: {
          params?: TParams;
          body?: TBody;
        };
        handler: (ctx: HandlerContext<TParams, TBody, undefined>) => any;
        headers?: Record<string, string>;
        middlewares?: Middleware<any,any,any,any>[],
      }
    ) => void;
  
    patch: <
      TParams extends AnyZodObject | undefined = undefined,
      TBody extends AnyZodObject | undefined = undefined
    >(
      path: string,
      config: {
        schema?: {
          params?: TParams;
          body?: TBody;
        };
        handler: (ctx: HandlerContext<TParams, TBody, undefined>) => any;
        headers?: Record<string, string>;
        middlewares?: Middleware<any,any,any,any>[],
      }
    ) => void;
  
    delete: <
      TParams extends AnyZodObject | undefined = undefined,
      TQuery extends AnyZodObject | undefined = undefined
    >(
      path: string,
      config: {
        schema?: {
          params?: TParams;
          query?: TQuery;
        };
        handler: (ctx: HandlerContext<TParams, undefined, TQuery>) => any;
        headers?: Record<string, string>;
        middlewares?: Middleware<any,any,any,any>[],
      }
    ) => void;
  };

export type AppConstructor = new (corsOptions?: CorsOptions, httpErrorHandler?: HttpErrorHandler, limiter? : RateLimitRequestHandler, middlewares? : Middleware<any,any,any,any>[]) => {
  app: Express;
  prefix: string;
  router: RouterMethods;
  setPrefix(prefix: string): void;
  httpErrorHandler: HttpErrorHandler | undefined;
  initialCorsOptions?: CorsOptions;
  middlewares: Middleware<any, any, any, any>[];
  current_middlewares: Middleware<any, any, any,any>[];
  setCors(corsOptions: CorsOptions | undefined): void
  setMiddlewares(middlewares: Middleware[]): void
  };

export type Middleware<
  TParams extends AnyZodObject | undefined = undefined,
  TBody  extends AnyZodObject | undefined = undefined,
  TQuery extends AnyZodObject | undefined = undefined,
  TExtra extends Record<string, any> = any

> = (ctx: HandlerContext<TParams, TBody | undefined, TQuery, TExtra>) => Promise<void> | void;






