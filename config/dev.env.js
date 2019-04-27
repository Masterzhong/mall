'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"http://192.168.1.101:8888/api/"'
  //BASE_API:'"https://api.shark-baby.com/"'
})
