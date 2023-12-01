import './InitEnvironment';

import type { Express } from 'express';
import express from 'express';

import { Logger } from '@/utils/Logger';

import { config } from './config';
import { InitializeMiddleware } from './InitializeMiddleware';
import { InitializeRoutes } from './InitializeRoutes';

export class Server {
    private readonly app: Express;

    constructor() {
        this.app = express();
    }

    public async start(): Promise<void> {
        await this.setup();
        this.app.listen(config.PORT, config.HOST, () => {
            this.onStart();
        });
    }

    private async setup(): Promise<void> {
        InitializeMiddleware.initCommonMiddleware(this.app);
        await InitializeRoutes.initialize(this.app);
        InitializeMiddleware.initErrorHandlingMiddleware(this.app);
    }

    private onStart(): void {
        const logger = Logger.getLogger();
        const protocol = config.SECURE ? 'https' : 'http';
        const link = `${protocol}://${config.HOST}:${config.PORT}`;

        logger.info(`Server started listening on ${link}`);
    }
}
