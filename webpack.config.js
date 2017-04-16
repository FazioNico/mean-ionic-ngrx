/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   09-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 13-04-2017
 */

 var webpack = require('webpack');
 var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);
 var config = require('@ionic/app-scripts/config/webpack.config.js')

 config.plugins.push(new webpack.EnvironmentPlugin(['IONIC_ENV', 'NODE_ENV']))

 module.exports = config
