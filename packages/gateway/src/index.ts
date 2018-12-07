import { EventEmitter } from 'events';

import * as server from './server';
import * as repository from './repository';
import { CONFIG } from './config';

const mediator: EventEmitter = new EventEmitter();

// process.setMaxListeners(5)

console.log('--- API Gateway Service ---');

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});

// process.on('uncaughtRejection', (err, promise) => {
//   console.error('Unhandled Rejection', err)
// })

// listen event on db ready
mediator.on('db.ready', (db) => {
  let rep;
  // DI to conect repository with database
  repository.connect(db)
    .then(async (repo) => {
      console.log('--- Repository connected to database ---');
      console.log('--- Starting Server ---');
      rep = repo;
      return await server.start({
        serverConfig: CONFIG.serverConfig,
        repo
      }).catch(err => err);
    })
    .then(config => {
      console.log(`Server started succesfully, running on port: ${CONFIG.serverConfig.port}  🎉`);
      console.log(`NODE_ENV: ${CONFIG.serverConfig.env_name}`);
      config.server.on('close', () => {
        console.log('[API GATEWAY] Server close()');
      });
    })
    .catch(err => {
      console.log('[ERROR] ', err);
    });
});

CONFIG.db.connect(CONFIG.dbSettings, mediator);
// Server body ready... emit event to connect database with repository
mediator.emit('boot.ready');
