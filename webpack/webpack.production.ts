import path from 'node:path';
import type webpack from 'webpack';

const config: webpack.Configuration = {
    mode: 'production',
    stats: 'normal',
    extends: path.resolve(__dirname, './webpack.common.ts'),
};

export default config;
