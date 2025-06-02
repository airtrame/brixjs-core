import { AppInstance } from "../interfaces/app-instance";
import { registeredRoute } from "../interfaces/registered-route";


export function registerRoutes(app: AppInstance, routes: registeredRoute[]) {

  routes.forEach((routeConfig) => {
    const constructor = routeConfig.route;
    const routeInstance = new constructor(app);

    app.setCors(routeConfig.cors);
    app.setMiddlewares((routeConfig.middlewares ? routeConfig.middlewares : []))

    if (routeInstance.versioning) {
        for (const version of routeInstance.getAvailableVersions!()) {
            app.setPrefix('/' + version + (routeConfig.prefix ? routeConfig.prefix : ''));
            routeInstance.callVersion!(version, app.router);
        }
    }
    else {
        app.setPrefix((routeConfig.prefix ? routeConfig.prefix : ''));
        if (typeof routeInstance.defineRoutes === 'function') {
            routeInstance.defineRoutes(app.router);
        }
    }
});
}
