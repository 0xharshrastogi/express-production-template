import type { Express } from 'express';

import { CommonMiddleware } from '@/middleware/CommonMiddleware';
import { ErrorHandlingMiddleware } from '@/middleware/ErrorHandlingMiddlware';

export class InitializeMiddleware {
    public static initCommonMiddleware(app: Express): void {
        const middleware = new CommonMiddleware(app);

        middleware.useCors();
        middleware.useLogRequest();
        middleware.useBodyParser();
        middleware.useURLEncoded();
    }

    public static initErrorHandlingMiddleware(app: Express): void {
        const middleware = new ErrorHandlingMiddleware(app);

        middleware.useHandle404Error();
        middleware.useErrorHandler();
    }
}
