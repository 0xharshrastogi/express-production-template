import winston from 'winston';

import { options } from '@/config/LoggerConfig.json';

export class Logger {
    private static instance?: Logger;

    private readonly logger: winston.Logger;

    constructor() {
        console.log('hell  so');
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    ...options.console,
                    format: winston.format.combine(
                        winston.format.simple(),
                        winston.format.timestamp({
                            format: options.console.timestamp as string,
                        }),
                        winston.format.colorize({ all: true }),
                        winston.format.printf((info) => Logger.printf(info)),
                    ),
                }),
                new winston.transports.File(options.file),
            ],
        });
    }

    public static getLogger(): winston.Logger {
        return Logger.getLoggerInstance().logger;
    }

    public static getLoggerInstance(): Logger {
        if (Logger.instance == null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private static printf(info: winston.Logform.TransformableInfo): string {
        const format = [info['timestamp'], `[${info.level}]`, info.message].join(' ');
        return format;
    }
}
