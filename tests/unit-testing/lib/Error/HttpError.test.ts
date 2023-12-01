import { ErrorSeverity, HttpStatusCode } from '@/lib/enum';
import type { IHttpErrorOptions } from '@/lib/error';
import { HttpError } from '@/lib/error';

describe(HttpError.name, () => {
    describe('constructor', () => {
        test('it should create an HttpError with default options', () => {
            const error = new HttpError('Internal Server Error');

            expect(error.message).toBe('Internal Server Error');
            expect(error.code).toBe(HttpStatusCode.InternalServerError);
        });

        test('it should create an HttpError with custom options', () => {
            const cause = new Error('Something went wrong');
            const options: IHttpErrorOptions = {
                code: HttpStatusCode.BadRequest,
                severity: ErrorSeverity.High,
                cause,
            };
            const error = new HttpError('Bad Request', options);

            expect(error.message).toBe('Bad Request');
            expect(error.code).toBe(HttpStatusCode.BadRequest);
            expect(error.critical).toBe(ErrorSeverity.High);
            expect(error.cause).toBe(cause);
        });
    });

    describe('toJSON', () => {
        test('it should return a JSON representation of the HttpError instance', () => {
            const message = 'Internal Server Error';
            const error = new HttpError(message);
            const expected = {
                success: false,
                name: HttpStatusCode[HttpStatusCode.InternalServerError],
                message,
                code: HttpStatusCode.InternalServerError,
            };

            expect(error.toJSON()).toMatchObject(expected);
        });
    });

    describe('toString', () => {
        test('it should return a string representation of the HttpError instance', () => {
            const error = new HttpError('Internal Server Error');

            expect(error.toString()).toBe('HttpError (low): Internal Server Error');
        });
    });

    describe('isHttpError', () => {
        test('it should return true if the object is an instance of HttpError', () => {
            const error = new HttpError('Internal Server Error');

            expect(HttpError.isHttpError(error)).toBeTruthy();
        });

        test('it should return false if the object is not an instance of HttpError', () => {
            const error = new Error('Some error');

            expect(HttpError.isHttpError(error)).toBeFalsy();
        });
    });
});
