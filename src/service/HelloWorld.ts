export class HelloWorld {
    public async wishHello(): Promise<string> {
        const resp = 'Hello World';
        return await Promise.resolve(resp);
    }
}
