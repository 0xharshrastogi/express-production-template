/**
 * @package
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import tsConfig from './tsconfig.json';

const config: JestConfigWithTsJest = {
    preset: 'ts-jest',
    watch: false,
    testEnvironment: 'node',
    modulePaths: [tsConfig.compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths),
};

export default config;
