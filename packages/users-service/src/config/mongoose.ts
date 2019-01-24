import * as mongoose from 'mongoose';
import { EventEmitter } from 'events';
import { Mongoose } from 'mongoose';

const db: Mongoose = mongoose;

const getMongoURL = (options) => {
  // concatenate url when using replica set
  let url = options.servers
  .reduce((prev, cur) => `${prev}${cur},`, 'mongodb://');

  // create url query for replicate set name and authentication database
  const queries = [];
  if (options.replicaSet)
    queries.push(`replicaSet=${options.replicaSet}`);
  if (options.authenticationDb)
    queries.push(`authSource=${options.authenticationDb}`);

  let query = queries.join('&');
  if (query)
    query = '?' + query;

  // specify database name
  url = `${url.substr(0, url.length - 1)}/${options.db}`;

  // build full url
  return url + query;
};
let mediatorInstance: EventEmitter;

export const connect = (options, mediator) => {
  // TODO: determine if autoIndex should be set to false in prod env
  // tslint:disable-next-line:max-line-length
  // db.connect(getMongoURL(options), { useNewUrlParser: true, poolSize: 3, config: { autoIndex: ['developpement', 'stage', 'preprod'].indexOf(serverConfig.envName) > -1 /*serverConfig.envName === 'developpement'*/ }});
  db.connect(getMongoURL(options),
              { useNewUrlParser: true, poolSize: 3, config: { autoIndex: ['developpement', 'stage', 'preprod'].indexOf(process.env.NODE_ENV) > -1}})
              .catch(err => console.log('[ERROR]: ', err));
  db.connection.setMaxListeners(20);
  mediatorInstance = mediator;
  db.connection.once('connected', () => {
    if (options.verbose) {
      console.log(`[INFO]: Mongoose default connection is open to ${getMongoURL(options)}`);
    }
    // database is connected and ready. Emit an event to notifier server app.
    mediator.emit('db.ready', db);
  });

  db.connection.once('error', (err) => {
    if (options.verbose) {
      console.log('[ERROR]: Mongoose default connection has occured ' + err + ' error');
    }
    mediator.emit('db.error', err);
  });
  db.connection.once('disconnected', () => {
    if (options.verbose) {
      console.log('[INFO]: Mongoose default connection is disconnected');
    }
    db.connection.removeAllListeners();
    // TODO: try db reco OR process.exit
  });
  process.once('SIGINT', () => {
    db.connection.close(() => {
      if (options.verbose) {
        console.log('[ERROR]: Mongoose default connection is disconnected due to application termination');
      }
      process.exit(0);
    });
  });
};

export const disconnect = (): Promise<void> => {
    mediatorInstance.removeAllListeners();
    return db.disconnect();
};
