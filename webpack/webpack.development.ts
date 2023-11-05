import 'webpack-dev-server';

import type webpack from 'webpack';

const config: webpack.Configuration = {
    extends: './webpack.common.ts',
    mode: 'development',
    watch: true,
    stats: 'minimal',
    watchOptions: {
        ignored: ['/node_modules/'],
    },
};

export default config;
