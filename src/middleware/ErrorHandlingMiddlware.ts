import type { Express, Response } from 'express';

import { StatusConstant } from '@/constants/StatusConstant';

export class ErrorHandlingMiddleware {
    private readonly app: Express;

    constructor(app: Express) {
        this.app = app;
    }

    useHandle404Error(): void {
        this.app.use((_, res) => {
            res.status(StatusConstant.code404).send(StatusConstant.code404Message);
        });
    }

    useErrorHandler(): void {
        // @ts-expect-error lib not working
        this.app.use((_err: Error, _req, res: Response, _next) => {
            res.status(StatusConstant.code500).send(StatusConstant.code500Message);
        });
    }
}
