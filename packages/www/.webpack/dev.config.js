const webpack = require('webpack')
const base = require('./base.config')

base.mode = 'development'

base.plugins.push(new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  REACT_APP_API: '/api/www/'
}))

base.optimization = {
  moduleIds: 'deterministic',
  runtimeChunk: true,
  usedExports: true,
  removeAvailableModules: false,
  removeEmptyChunks: false,
}

base.devtool = 'eval-cheap-module-source-map'

base.devServer = {
  compress: true,
  hot: true,
  host: '0.0.0.0',
  port: 3000,
  historyApiFallback: true,
  allowedHosts: 'all',
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      pathRewrite: {'^/api' : ''},
      changeOrigin: true,
    }
  }
}

module.exports = base
