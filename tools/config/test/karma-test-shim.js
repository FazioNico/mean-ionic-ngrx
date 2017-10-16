/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   16-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-10-2017
 */

 /**
  * Ionic Karma test entry point v.0.0.1
  */
 Error.stackTraceLimit = Infinity;

 require('core-js/es6');
 require('core-js/es7/reflect');

 require('zone.js/dist/zone');
 require('zone.js/dist/long-stack-trace-zone');
 require('zone.js/dist/proxy');
 require('zone.js/dist/sync-test');
 require('zone.js/dist/jasmine-patch');
 require('zone.js/dist/async-test');
 require('zone.js/dist/fake-async-test');

 var appContext = require.context('../../../src', true, /\.spec\.ts/);

 appContext.keys().forEach(appContext);

 var testing = require('@angular/core/testing');
 var browser = require('@angular/platform-browser-dynamic/testing');

 testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());
