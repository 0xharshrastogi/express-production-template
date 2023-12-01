import dotenv from 'dotenv';

import { env_file } from '@/config/ServerConfig.json';
import { Environment } from '@/lib/enum';
import { Logger } from '@/utils/Logger';

const logger = Logger.getLogger();

const active = (process.env['NODE_ENV'] as Environment) ?? Environment.Local;
const output = dotenv.config({
    path: env_file[active],
});

if (output.error != null) {
    logger.error('Failed to load environment variable file', output.error);
} else {
    logger.info(`Environment: ${active}`);
}
