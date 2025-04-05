module.exports = {
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ['opted-out-external-package'],
  turbopack: {
    moduleIdStrategy:
      process.env.NODE_ENV === 'production' ? 'deterministic' : undefined,
  },
}
