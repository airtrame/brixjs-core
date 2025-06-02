import { AnyZodObject } from "zod";
import { HandlerContext, Middleware } from "../types/types"; 

export interface RouterMethods {
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
    listen: (port: number) => void;
}