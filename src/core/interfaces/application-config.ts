import { CorsOptions } from "cors"
import { registeredRoute } from "./registered-route"
import { HttpErrorHandler } from "../classes/http-error-handler" 
import { RateLimitRequestHandler } from "express-rate-limit"
import { Middleware } from "../types/types"

export interface applicationConfig {
    cors : CorsOptions
    routes : registeredRoute[]
    httpErrorHandler : HttpErrorHandler,
    limiter? : RateLimitRequestHandler,
    middlewares : Middleware[]
  }


  
