import * as express from 'express';
export * from './proxy';
export * from './discoverer';

export const defaultRoutes = () => {
  return express.Router()

  .get('/', (req, res) => {
    res.status(200).json({code: 200, message: 'Welcome to server API Gateway 🎉'});
  })

  .get('/_debug', (req, res) => {
    console.log(`[DEBUG] Headers:\n${JSON.stringify(req.headers, null, 2)}`);
    console.log(`[DEBUG] Ips:\n${req.ip} - ${JSON.stringify(req.ips, null, 2)}`);
    res.status(200).json();
  })

  // generate 500 error code for unit testing
  .get('/500', (req, res, next) => {
    next('Internal Server Error');
  });
};
