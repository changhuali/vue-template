const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
  target: 'node',
  entry: {
    app: path.resolve(process.cwd(), 'src/entry-server.js'),
  },
  output: {
    filename: '[name].server.js',
    libraryTarget: 'commonjs2',
  },
  externals: Object.keys(require(path.join(process.cwd(), 'package.json')).dependencies),
  plugins: [
    new VueSSRServerPlugin(),
  ],
});
