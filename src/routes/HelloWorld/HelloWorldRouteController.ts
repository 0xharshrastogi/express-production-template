import type { Request, Response } from 'express';

import { HttpMethod, HttpStatusCode } from '@/lib/enum';
import { HelloWorld } from '@/service/HelloWorld';

import type { IRoute } from '../Controller';
import { Controller } from '../Controller';

export class HelloWorldRouteController extends Controller {
    public override path = '/hello-world';

    public helloWorldService: HelloWorld = new HelloWorld();

    public override routes: IRoute[] = [
        {
            path: '/',
            method: HttpMethod.GET,
            handler: this.helloWorld.bind(this),
            middlewares: [],
        },
    ];

    public async helloWorld(_req: Request, res: Response): Promise<void> {
        const response = await this.helloWorldService.wishHello();

        res.status(HttpStatusCode.OK).send(response);
    }
}
