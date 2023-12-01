import path from 'node:path';

import 'webpack-dev-server';

import type webpack from 'webpack';

const config: webpack.Configuration = {
    extends: path.resolve(__dirname, './webpack.common.ts'),
    mode: 'development',
    stats: 'minimal',
    watchOptions: {
        ignored: ['/node_modules/'],
    },
};

export default config;
