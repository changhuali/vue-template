// es6 shim
require('babel-polyfill');
// enable colorful console info
require('colors');
// enable es6 in server
require('babel-register');
// initial global var
global.__IS_DEV_ENV__ = process.env.NODE_ENV !== 'production';
// excute server.js
require('./src/server');
