/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-04-2017
 */

 var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

let port = 8100;

let config = {
  baseUrl: `http://localhost:${port}/`,
  specs: ['../e2e/**/*.e2e-spec.ts'],
  exclude: [],

  framework: 'jasmine',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },
  beforeLaunch: function() {

      require('ts-node').register({
          project: 'e2e'
      });

      require('connect')().use(require('serve-static')('www')).listen(8100);

  },
  onPrepare: function() {
      //browser.ignoreSynchronization = true;
      jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },

  useAllAngular2AppRoots: true
};

// if(process.env.TRAVIS){
//   config.capabilities = {
//     'browserName': 'firefox',
//     'marionette': false
//   }
// }

exports.config = config;
