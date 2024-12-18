require('dotenv').config();
require('@babel/register')({
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime'],
  });
  
require('./server.js');