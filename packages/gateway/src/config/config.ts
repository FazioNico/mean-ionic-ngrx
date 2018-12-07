import dotenv from 'dotenv';
dotenv.config();
console.log('---->', process.env.NODE_ENV);

export const dbSettings = {
  host: process.env.DB_REDIS_SERVERS || '127.0.0.1', // YOUR-REDISLAB-URL,
  port: process.env.DB_REDIS_PORT || 6379, // YOUR-REDIS-PORT,
  password: process.env.DB_REDIS_PASS || '' // YOUR-REDIS-PASS
};

export const serverConfig = {
  port: process.env.PORT || 3000,
  env_name: process.env.NODE_ENV || 'dev',
  backendToken: 'this is a bad backend token',
  // ssl: require('./ssl')
};
