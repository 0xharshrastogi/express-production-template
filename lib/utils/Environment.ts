import type { IHostEnvironment, IHostEnvironmentInstance } from 'lib/types';

/**
 * Represents the host environment and provides utility methods to check the environment.
 */
const HostEnvironment: IHostEnvironment = class implements IHostEnvironmentInstance {
    get envName(): string {
        return process.env['NODE_ENV'] ?? 'development';
    }

    static isDevelopment(host: IHostEnvironmentInstance): boolean {
        return this.isEnvironment(host, 'development');
    }

    static isEnvironment(host: IHostEnvironmentInstance, name: string): boolean {
        return host.envName === name;
    }

    static isProduction(host: IHostEnvironmentInstance): boolean {
        return this.isEnvironment(host, 'production');
    }

    static isStaging(host: IHostEnvironmentInstance): boolean {
        return this.isEnvironment(host, 'staging');
    }
};

/**
 * Represents the environment class.
 */
export class Environment extends HostEnvironment {}
