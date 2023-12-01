import { HttpStatusCode } from '../enum';
import type { IHttpErrorOptions } from './HttpError';
import { HttpError } from './HttpError';

export class ValidationError extends HttpError {
    constructor(message: string);
    constructor(message: string, options?: Omit<IHttpErrorOptions, 'code'>);
    constructor(message: string, options?: Omit<IHttpErrorOptions, 'code'>) {
        super(message, { ...options, code: HttpStatusCode.BadRequest });

        this.name = 'ValidationError';
    }
}
