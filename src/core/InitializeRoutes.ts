import type { Express } from 'express';

import type { Controller } from '@/routes/Controller';
import { HelloWorldRouteController } from '@/routes/HelloWorld';

export class InitializeRoutes {
    public static async initialize(app: Express): Promise<void> {
        for (const controller of await this.getControllers()) {
            app.use(controller.path, controller.getRouter());
        }
    }

    private static async getControllers(): Promise<Controller[]> {
        const routes: Controller[] = [];
        routes.push(new HelloWorldRouteController());
        return await Promise.resolve(routes);
    }
}
