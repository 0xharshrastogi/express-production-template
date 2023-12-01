const config = {
    '*.{ts,js}': () => ['tsc --noEmit --pretty', 'npm run format', 'npm run lint'],
};

module.exports = config;
