import type { Express } from 'express';
import express from 'express';

import * as ServerConfig from '@/config/ServerConfig.json';
import { Logger } from '@/utils/Logger';

import { InitializeMiddleware } from './InitializeMiddleware';
import { InitializeRoutes } from './InitializeRoutes';

export const server = async (): Promise<void> => {
    const app: Express = express();

    const { host, port, secure } = ServerConfig;

    InitializeMiddleware.initCommonMiddleware(app);
    await InitializeRoutes.initialize(app);
    InitializeMiddleware.initErrorHandlingMiddleware(app);

    app.listen(port, host, () => {
        const logger = Logger.getLogger();
        const link = `${secure ? 'https://' : 'http://'}${host}:${port}`;

        logger.info(`Server started listening on ${link}`);
    });
};
