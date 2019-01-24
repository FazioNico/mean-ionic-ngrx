const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const merge = require('webpack-merge');
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  externals: /^[a-z\-0-9]+$/,
  context: path.resolve('./src'),
  target: 'node',
  mode: env !== 'developpement' || 'production' ? 'none' : env,
  entry: {
    index: './index.ts',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    libraryTarget:  'commonjs' // added
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: path.resolve('./node_modules'),
    }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      path.resolve(__dirname, './node_modules'),
      // path.resolve(__dirname, './src/utils'),
    ],
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    // },
  },
};

const developmentConfig = {
  // host: '0.0.0.0',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new NodemonPlugin({
      // What to watch.
      watch: path.resolve('./dist'),
      // Files to ignore.
      ignore: ['*.js.map'],
      // Detailed log.
      verbose: true,
      nodeArgs: [ '--inspect=9992' ]
    }),
  ],
};

const productionConfig = {
  devtool: 'hidden-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  // optimization: {
  //   minimizer: [
      
  //     // we specify a custom UglifyJsPlugin here to get source maps in production
  //     new UglifyJSPlugin({
  //       cache: true,
  //       parallel: true,
  //       uglifyOptions: {
  //         compress: false,
  //         ecma: 6,
  //         mangle: true,
  //       },
  //       sourceMap: true,
  //     }),
  //   ],
  // },
};

const stageConfig = {...productionConfig};

const testConfig = {
  devtool: "inline-source-map",
  module: {
    rules: [{
      exclude: path.resolve('./node_modules'),
      enforce: 'post',
      loader: 'istanbul-instrumenter-loader',
      query: {
          esModules: true
      },
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ]
}


// module.exports = merge(
//   baseConfig, env === 'development' 
//     ? developmentConfig
//     : productionConfig
// );

const getEnvConfig = () => {
  switch (env) {
    case 'production':
      console.log('[info]: Webpack build mode ==> prod');
      return productionConfig
    case 'development':
      console.log('[info]: Webpack build mode ==> dev');
      return developmentConfig
    case 'test':
      console.log('[info]: Webpack build mode ==> test');
      return testConfig
    case 'stage':
      console.log('[info]: Webpack build mode ==> stage');
      return stageConfig
  }
  console.log('[info]: Webpack build mode ==> default dev');
  return developmentConfig
}

module.exports = merge(
  baseConfig, getEnvConfig()
);