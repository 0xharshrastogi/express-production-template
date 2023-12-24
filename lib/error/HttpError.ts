import { ErrorSeverity, HttpStatusCode } from '../enum';

/**
 * Represents options for creating an HTTP error.
 * @interface
 */
export interface IHttpErrorOptions {
    /**
     * The error that caused the HTTP error.
     */
    cause?: Error;

    /**
     * The HTTP status code to use for the error. Defaults to 500 if not provided.
     */
    code?: HttpStatusCode;

    /**
     * Represents the criticality of the error. Defaults to `low` if not provided.
     */
    severity?: ErrorSeverity;
}

/**
 * Represents an HTTP error.
 * @class
 * @extends Error
 */
export class HttpError extends Error {
    public code: HttpStatusCode;
    public critical: string;

    /**
     * Creates an instance of HttpError.
     * @param {string} message - The error message.
     */
    constructor(message: string);
    /**
     * Creates an instance of HttpError.
     * @param {string} message - The error message.
     * @param {IHttpErrorOptions} [options] - The options for the HttpError.
     */
    constructor(message: string, options?: IHttpErrorOptions);
    constructor(message: string, options?: IHttpErrorOptions) {
        super(message);

        this.cause = options?.cause;
        this.name = 'HttpError';
        this.code = options?.code ?? HttpStatusCode.InternalServerError;
        this.critical = options?.severity ?? ErrorSeverity.Low;
    }

    /**
     * Checks if the given error is an instance of HttpError.
     * @param error - The error to check.
     * @returns True if the error is an instance of HttpError, false otherwise.
     */
    public static isHttpError(error: unknown): error is HttpError {
        return error instanceof HttpError;
    }

    /**
     * Returns a JSON representation of the HttpError.
     * @returns {Record<string, unknown>} - The JSON representation of the HttpError.
     */
    toJSON(): Record<string, unknown> {
        return {
            name: HttpStatusCode[this.code],
            code: this.code,
            success: false,
            message: this.message,
        };
    }

    /**
     * Returns a string representation of the HttpError.
     * @returns {string} - The string representation of the HttpError.
     */
    override toString(): string {
        return `${this.name} (${this.critical}): ${this.message}`;
    }
}
