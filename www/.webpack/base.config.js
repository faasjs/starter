const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '..', 'src'),
        use: [
          {
            loader: '@sucrase/webpack-loader',
            options: {
              transforms: ['typescript', 'jsx'],
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
           {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: ['./src', './src/libs', 'node_modules']
  },
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    pathinfo: false
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    antd: 'antd'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      hash: true
    })
  ]
}
