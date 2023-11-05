import type { Request, Response } from 'express';
import { Router } from 'express';

export interface IAbstractRouteController {
    router: Router;
}

export abstract class AbstractRouteController {
    public readonly router = Router();

    private readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

    public InitializeController(): void {
        this.InitializeGet();
        this.InitializePost();
    }

    public runService(_req: Request, res: Response): void {
        res.send(`runService Method for ${this.path}does not exist !`);
    }

    public InitializeGet(): void {
        this.router.get(this.path, this.runService.bind(this)).bind(this);
    }

    public InitializePost(): void {
        this.router.post(this.path, this.runService.bind(this)).bind(this);
    }
}
