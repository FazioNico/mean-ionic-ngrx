import dotenv from 'dotenv';
dotenv.config();
// console.log('------->', process.env.PORT);

import * as RateLimit from 'express-rate-limit';
import { CONFIG } from './';

export const serverConfig: CONFIG.IServerConfig =  {
  envName: process.env.NODE_ENV || 'developpement',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3003',
  secretTokent: process.env.SECRET_TOKEN || 'this is a bad secret token',
  jwtExpire: process.env.JWT_EXPIRE || (1440 * 60 * 1000).toString(), // expires in 24 hours
  requestsLimiter: new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    delayMs: 0, // disable delaying - full speed until the max limit is reached
    // make it work with proxies
    keyGenerator: function (req /*, res*/) {
      return req.get('x-forwarded-for') || req.ip;
    },
  }),
  verbose: true,
  backendToken: 'this is a bad backend token',
  gateway_host: process.env.APIGATEWAY_HOST || 'http://localhost:3001',
  getHost: () => 'http://' + serverConfig.host + ':' + serverConfig.port,
};

export const dbConfig: CONFIG.IDbConfig = {
  db: process.env.DB || 'demo',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    'localhost:27017',
  ],
  verbose: true,
  replicaSet: process.env.DB_REPLICASET || '',
  authenticationDb: process.env.DB_AUTHENTICATION || '',
};
