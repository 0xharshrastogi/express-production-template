export interface IHostEnvironmentInstance {
    /**
     * Gets the name of the environment. The host automatically sets this
     * property to the value of the "environment" key as specified in configuration.
     */
    envName: string;
}

export interface IHostEnvironment {
    new (): IHostEnvironmentInstance;

    /**
     * Checks if the current host environment name is `development`.
     * @param hostEnvironment environment instance
     * @returns `true` if the environment name is development; otherwise, `false`.
     */
    isDevelopment(hostEnvironment: IHostEnvironmentInstance): boolean;

    /**
     * Compares the current host environment name against the specified value.
     * @param hostEnvironment An instance of `IHostEnvironment`.
     * @param environmentName Environment name to validate against.
     * @returns `true` if the specified name is the same as the current environment; otherwise, `false`.
     */
    isEnvironment(hostEnvironment: IHostEnvironmentInstance, environmentName: string): boolean;

    /**
     * Checks if the current host environment name is `production`.
     * @param hostEnvironment environment instance
     * @returns `true` if the environment name is production; otherwise, `false`.
     */
    isProduction(hostEnvironment: IHostEnvironmentInstance): boolean;

    /**
     * /**
     * Checks if the current host environment name is `staging`.
     * @param hostEnvironment environment instance
     * @returns `true` if the environment name is staging; otherwise, `false`.
     */
    isStaging(hostEnvironment: IHostEnvironmentInstance): boolean;
}
