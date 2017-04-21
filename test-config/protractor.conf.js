/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-04-2017
 */

 var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

 exports.config = {
     allScriptsTimeout: 11000,
     directConnect: true,
     capabilities: {
         'browserName': 'chrome'
     },
     framework: 'jasmine',
     jasmineNodeOpts: {
         showColors: true,
         defaultTimeoutInterval: 30000,
         print: function() {}
     },
     specs: ['../e2e/**/*.e2e-spec.ts'],
     baseUrl: 'http://localhost:8100',
     useAllAngular2AppRoots: true,
     beforeLaunch: function() {

         require('ts-node').register({
             project: 'e2e'
         });

         require('connect')().use(require('serve-static')('www')).listen(8100);

     },
     onPrepare: function() {
         jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
     }
 }
