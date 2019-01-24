import { EventEmitter } from 'events';
// import module and config
import { UsersModule as service } from './users.module';
import { CONFIG } from './config';

// then create the service module
/**
 *  [Backend] Auth Node Server Microservices
 *  Follow steps 0 to final to know how it work
 */
/** step 0: start processing with comments */
console.log('[INFO]: --- Users Node Server Microservice ---', CONFIG.serverConfig.verbose);
console.log('[INFO]: Connecting to database...', CONFIG.serverConfig.verbose);
/** step 1: create mediator eventemitter */
const mediator: EventEmitter = new EventEmitter();
/** step 2: connect database with config+mediator as DI */
CONFIG.db.connect(CONFIG.dbConfig, mediator);
/** step 3: listen database ready and connected before starting node server */
mediator.on('db.ready', async (db) => {
  console.log('[INFO]: Starting node server...', CONFIG.serverConfig.verbose);
  /** step 4: create server config */
  const serverConfig = Object.assign({}, CONFIG.serverConfig, /*{logger: Logger()}*/);
  /** step 5: define  module options */
  const OPTIONS = {
    serverConfig,
    db: db || []
  };
  /** step 6: build Module with options */
  console.log('[INFO]: Build service...', CONFIG.serverConfig.verbose);
  const myModule: any = new service(OPTIONS);
  /** step 7: init module */
  await myModule.init()
  /** step 8: handle bootstrap module errors */
  .catch(err => console.log(err, serverConfig.verbose));
  /** step 9 (final): display final console message */
  console.log(`[INFO]: {${myModule.serviceName || 'Module'}} Microservice starting with success 🎉 `, CONFIG.serverConfig.verbose);
});
