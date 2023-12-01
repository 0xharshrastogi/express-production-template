import winston from 'winston';

import { options } from '@/config/LoggerConfig.json';

const { combine, printf, colorize, padLevels } = winston.format;

export class Logger {
    private static instance?: Logger;

    private readonly logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: options.level,
            transports: [
                new winston.transports.Console({
                    format: combine(
                        colorize(),
                        padLevels(),
                        printf((info) => Logger.printf(info)),
                    ),
                }),
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
        return `${info.level}: ${info.message}`;
    }
}
