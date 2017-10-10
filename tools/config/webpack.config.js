/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-10-2017
*/

var webpack = require('webpack');
var config = require('@ionic/app-scripts/config/webpack.config.js')

config.dev.plugins.push(
  // Get access to IONIC_ENV, but also get access to NODE_ENV
  new webpack.EnvironmentPlugin({
    'IONIC_ENV': JSON.stringify(process.env.IONIC_ENV),
    'NODE_ENV': 'dev'
  })
)
config.prod.plugins.push(
  // Get access to IONIC_ENV, but also get access to NODE_ENV
  new webpack.EnvironmentPlugin({
    'IONIC_ENV': JSON.stringify(process.env.IONIC_ENV),
    'NODE_ENV': 'prod'
  })
);
config.dev.module.loaders.push(
  {
    test: /\.js$/,
    loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
  }
)
config.prod.module.loaders.push(
  {
    test: /\.js$/,
    loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
  }
)

module.exports = {
  dev: config.dev,
  prod: config.prod
}
