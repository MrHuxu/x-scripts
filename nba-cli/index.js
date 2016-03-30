#!/usr/bin/env node
require('babel-register')({
  presets: ['es2015', 'stage-0']
});
require("babel-polyfill");

var app = require('./lib/app');
app.default();
