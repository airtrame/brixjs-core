import 'reflect-metadata';
import { RouteConfig } from "../interfaces/route-config";
import { routerMethod } from '../types/types';

const VERSION_KEY = Symbol('version');

export abstract class Routes {
    constructor(app: { router: routerMethod }) {}
    getAvailableVersions(): string[] {
      const prototype = Object.getPrototypeOf(this);
      const methodNames = Object.getOwnPropertyNames(prototype);
      
      return methodNames
        .map(name => Reflect.getMetadata(VERSION_KEY, prototype, name))
        .filter(Boolean); 
    }
    callVersion(version: string, router: routerMethod): void {
      const prototype = Object.getPrototypeOf(this);
      const methodNames = Object.getOwnPropertyNames(prototype);
  
      for (const name of methodNames) {
        const metaVersion = Reflect.getMetadata(VERSION_KEY, prototype, name);
        if (metaVersion === version) {
          const method = this[name as keyof this];
          if (typeof method === 'function') {
            (method as (router: routerMethod) => void).call(this, router);
            return;
          }
        }
      }
      console.warn(`No route found for version "${version}"`);
    }
    defineRoutes?(router: routerMethod): void;
  }
export function Route(options: RouteConfig): ClassDecorator {
  return function (target: Function) {
    Object.setPrototypeOf(target.prototype, Routes.prototype);
    Object.setPrototypeOf(target, Routes);
    target.prototype.versioning = options.versioning || false;
  };
}
export function Version(version: string) {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata(VERSION_KEY, version, target, propertyKey);
  };
}