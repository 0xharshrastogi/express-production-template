import './InitEnvironment';

import type http from 'node:http';

import type { Express } from 'express';
import express from 'express';
import type winston from 'winston';

import { Logger } from '@/utils/Logger';

import { config } from './config';
import { InitializeMiddleware } from './InitializeMiddleware';
import { InitializeRoutes } from './InitializeRoutes';

export class Server {
    private server?: http.Server;

    private readonly app: Express;

    private readonly logger: winston.Logger = Logger.getLogger().child({
        class: 'Server',
    });

    constructor() {
        this.app = express();
    }

    public async start(): Promise<void> {
        await this.setup();

        this.server = this.app.listen(config.PORT, config.HOST, () => {
            this.onStart();
        });

        this.server.on('error', (error: NodeJS.ErrnoException) => {
            this.onError(error);
        });

        process.on('SIGTERM', () => {
            this.onShutdown();
        });

        process.on('SIGINT', () => {
            this.onShutdown();
        });
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall === 'listen' && error.code === 'EADDRINUSE') {
            this.logger.error(`Port ::${config.PORT} is already in use`);

            setTimeout(async () => {
                this.logger.info(`Retrying to start server on port ::${config.PORT}`);
                await this.start();
            }, 10_000);
        }

        setTimeout(async () => {
            this.logger.info('Retrying to start server');
            await this.start();
        }, 10_000);
    }

    private onShutdown(): void {
        this.server?.close(() => {
            this.logger.info('Server is shutting down');
        });
    }

    private onStart(): void {
        const logger = Logger.getLogger();
        const protocol = config.SECURE ? 'https' : 'http';
        const link = `${protocol}://${config.HOST}:${config.PORT}`;

        logger.info(`Server started listening on ${link}`);
    }

    private async setup(): Promise<void> {
        InitializeMiddleware.initCommonMiddleware(this.app);
        await InitializeRoutes.initialize(this.app);
        InitializeMiddleware.initErrorHandlingMiddleware(this.app);
    }
}
