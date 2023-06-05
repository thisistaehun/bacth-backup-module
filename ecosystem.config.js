module.exports = {
  apps: [
    {
      name: 'backup-module',
      script: 'dist/main.js',
      instances: 1,
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
