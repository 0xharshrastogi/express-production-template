interface Configuration {
    HOST: string;
    PORT: number;
    SECURE: boolean;
}

export const config: Configuration = {
    HOST: process.env['HOST'] ?? 'localhost',
    PORT: parseInt(process.env['PORT'] ?? '3000', 10),
    SECURE: process.env['SECURE'] === 'true',
};
