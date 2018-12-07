import { environmentConfig } from './config';
import * as db from './mongoose';
import * as RateLimit from 'express-rate-limit';
import { RequestHandlerParams } from 'express-serve-static-core';

export interface CONFIG {
    serverConfig: CONFIG.IServerConfig;
    dbConfig: CONFIG.IDbConfig;
    db: CONFIG.Idb;
}
export namespace CONFIG {
  export interface IServerConfig {
    envName: string;
    host: string;
    port: string;
    secretTokent: string;
    jwtExpire: string;
    requestsLimiter: RequestHandlerParams;
    verbose: boolean;
    backendToken: string;
    gateway_host: string;
    getHost(): string;
  }
  export interface IDbConfig {
    db: string;
    user: string;
    pass: string;
    servers: string[];
    verbose: boolean;
    replicaSet: string;
    authenticationDb: string;
  }
  export interface Idb extends Object {
    connect: (option, mediator) => void;
    disconnect: (mediator) => Promise<void>;
  }
}

export const CONFIG: CONFIG = Object.assign({}, {
  serverConfig: environmentConfig().serverConfig,
  dbConfig: environmentConfig().dbConfig,
  db: db,
});
