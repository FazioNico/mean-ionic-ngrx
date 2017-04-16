/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   16-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-04-2017
 */


 var webpack = require('webpack');
 var path = require('path');

 module.exports = {
   devtool: 'inline-source-map',

   resolve: {
     extensions: ['.ts', '.js']
   },

   module: {
     rules: [
       {
         test: /\.ts$/,
         loaders: [
           {
             loader: 'ts-loader'
           } , 'angular2-template-loader'
         ]
       },
       {
         test: /\.html$/,
         loader: 'html-loader'
       },
       {
         test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
         loader: 'null-loader'
       }
     ]
   },

   plugins: [
      // using in Ionic 2 but cause WARNING on run
      //  new webpack.ContextReplacementPlugin(
      //    // The (\\|\/) piece accounts for path separators in *nix and Windows
      //    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      //    root('./src'), // location of your src
      //    {} // a map of your routes
      //  )

      // For Ionic 3:
      // use this to remove: WARNING in ./~/ionic-angular/util/ng-module-loader.js
      new webpack.ContextReplacementPlugin(
         /ionic-angular/,
         path.resolve(__dirname, './src'),
         {}
      ),
      // use this to remove: WARNING in ./~/@angular/core/@angular/core.es5.js
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.resolve(__dirname, './src'),
        {}
      )
   ]
 };

 function root(localPath) {
   return path.resolve(__dirname, localPath);
 }
