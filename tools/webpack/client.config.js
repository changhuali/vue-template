const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const getEntry = () => {
  if (__IS_DEV_ENV__) {
    return {
      whm: 'webpack-hot-middleware/client',
      app: path.resolve(process.cwd(), 'src/entry-client.js')
    };
  }
  return {
    app: path.resolve(process.cwd(), 'src/entry-client.js'),
  };
}

const getPlugin = () => {
  const plugins = [
    new VueSSRClientPlugin(),
  ];
  if (__IS_DEV_ENV__) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
    );
  } else {
    plugins.push(
      new CleanWebpackPlugin(
        ['dist'],
        {
          root: process.cwd(),
        }
      ),
    );
  }
  return plugins;
}

module.exports = merge(baseConfig, {
  entry: getEntry(),
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      },
    },
  },
  plugins: getPlugin(),
});
