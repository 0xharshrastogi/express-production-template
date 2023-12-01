import { HelloWorld } from '@/service/HelloWorld';

describe(HelloWorld.name, () => {
    const helloWorld = new HelloWorld();
    describe('wishHello', () => {
        test('it should return a promise which resolves to a string', async () => {
            const result = await helloWorld.wishHello();

            expect(typeof result).toBe('string');
            expect(result).toBeTruthy();
        });
    });
});
