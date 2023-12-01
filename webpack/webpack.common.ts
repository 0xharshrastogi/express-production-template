import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../build'),
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.json'),
            }),
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: 'environment', to: 'environment' }],
        }),
    ],
    externals: [nodeExternals()],
};

export default config;
