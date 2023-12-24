import type { Express, Response } from 'express';

import { HttpStatusCode } from '@/lib/enum';

export class ErrorHandlingMiddleware {
    private readonly app: Express;

    constructor(app: Express) {
        this.app = app;
    }

    useErrorHandler(): void {
        // @ts-expect-error lib not working
        this.app.use((_err: Error, _req, res: Response, _next) => {
            res.status(HttpStatusCode.InternalServerError).send({
                code: HttpStatusCode.InternalServerError,
                message: 'Internal Server Error !',
                error: _err,
            });
        });
    }

    useHandle404Error(): void {
        this.app.use((_, res) => {
            res.status(HttpStatusCode.NotFound).send('Path Not Found !');
        });
    }
}
