const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

global.__IS_DEV_ENV__ = process.env.NODE_ENV !== 'production';

const getOutput = () => {
  return {
    path: path.resolve(process.cwd(), 'dist/assets'),
    publicPath: '/assets/',
    filename: '[name].js',
  };
}

const webpackMode = __IS_DEV_ENV__ ? 'development' : 'production';

module.exports = {
  mode: webpackMode,
  output: getOutput(),
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.vue$/,
        include: [
          path.resolve(process.cwd(), 'src')
        ],
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(process.cwd(), 'src')
        ],
        exclude: [
          '/node_modules/',
        ],
        use: 'babel-loader',
      },
      {
        test: /\.(c|le)ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:8]',
                }
              },
              'postcss-loader',
              'less-loader',
            ]
          },
          {
            use: [
              'vue-style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader',
            ]
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8
            }
          }
        ]
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(process.cwd(), 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.vue', '.json'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false,
        },
      }
    }),
  ],
};
