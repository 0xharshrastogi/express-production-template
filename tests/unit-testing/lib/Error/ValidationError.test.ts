import { HttpStatusCode } from '@/lib/enum';
import { HttpError, ValidationError } from '@/lib/error';

describe(ValidationError.name, () => {
    describe('constructor', () => {
        test('it should create an HttpError with default options', () => {
            const message = 'FirstName is missing';
            const error = new ValidationError(message);

            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(HttpStatusCode.BadRequest);
            expect(error.message).toBe(message);
        });
    });
});
