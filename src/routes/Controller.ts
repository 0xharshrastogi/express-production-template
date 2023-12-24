import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

import { HttpMethod } from '@/lib/enum';

export interface IRoute {
    method: HttpMethod;
    middlewares: ((request: Request, response: Response, next: NextFunction) => Promise<void> | void)[];
    path: string;
    handler(request: Request, response: Response): Promise<void> | void;
}

export abstract class Controller {
    public readonly middleware: ((request: Request, response: Response, next: NextFunction) => Promise<void> | void)[] =
        [];

    public readonly router = Router();

    public readonly routes: IRoute[] = [];

    public abstract path: string;

    getRouter(): Router {
        for (const middleware of this.middleware) {
            this.router.use(middleware);
        }

        for (const route of this.routes) {
            for (const middleware of route.middlewares) {
                this.router.use(this.path + route.path, middleware);
            }

            switch (route.method) {
                case HttpMethod.GET:
                    this.router.get(route.path, async (req, res) => {
                        await route.handler(req, res);
                    });
                    break;
                case HttpMethod.POST:
                    this.router.post(route.path, async (req, res) => {
                        await route.handler(req, res);
                    });
                    break;
                case HttpMethod.DELETE:
                    this.router.delete(route.path, async (req, res) => {
                        await route.handler(req, res);
                    });
                    break;
                case HttpMethod.PUT:
                    this.router.delete(route.path, async (req, res) => {
                        await route.handler(req, res);
                    });
                    break;

                case HttpMethod.PATCH:
                    this.router.patch(route.path, async (req, res) => {
                        await route.handler(req, res);
                    });
                    break;
                default:
                    throw new Error('Invalid HTTP method');
            }
        }
        return this.router;
    }
}
