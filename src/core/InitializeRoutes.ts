import type { Express } from 'express';

import { type IAbstractRouteController } from '@/routes/AbstractRouteController';
import { HelloWorldRouteController } from '@/routes/HelloWorld/HelloWorldRouteController';

export class InitializeRoutes {
    public static async initialize(app: Express): Promise<void> {
        const routes = await InitializeRoutes.getRoutes();
        routes.forEach((controller) => app.use('/', controller.router));
    }

    private static async getRoutes(): Promise<IAbstractRouteController[]> {
        const routes: IAbstractRouteController[] = [];
        routes.push(new HelloWorldRouteController());
        return await Promise.resolve(routes);
    }
}
