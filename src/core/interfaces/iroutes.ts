import { routerMethod } from "../types/types";

export  interface IRoutes {
    defineRoutes?(route : routerMethod): void;
    versioning? : boolean
    getAvailableVersions?():string[] 
    callVersion?(version: string, router: routerMethod) : void
}