import cors from 'cors';
import type { Express } from 'express';
import { json, urlencoded } from 'express';

import { Logger } from '@/utils/Logger';

export class CommonMiddleware {
    private readonly app: Express;

    constructor(app: Express) {
        this.app = app;
    }

    public useBodyParser(): void {
        this.app.use(json());
    }

    public useCors(): void {
        this.app.use(cors());
    }

    public useLogRequest(): void {
        const logger = Logger.getLogger();
        this.app.use((req, _, next) => {
            logger.info(`method=${req.method} path=${req.originalUrl}`);
            next();
        });
    }

    public useURLEncoded(): void {
        this.app.use(urlencoded({ extended: true }));
    }
}
