import * as express from 'express';
// import { fetcher, IFetchResponse, httpErrorFactory } from '@agenda.ch/backend-utils';
import * as http from 'http';

interface IRequestOptions {
    method: string
    ; headers?: {}        // request header. format {a:'1'} or {b:['1','2','3']}
    ; redirect?: string // set to `manual` to extract redirect headers, `error` to reject redirect
    ; follow?: number         // maximum redirect count. 0 to not follow redirect
    ; timeout?: number         // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
    ; compress?: boolean     // support gzip/deflate content encoding. false to disable
    ; size?: number            // maximum response body size in bytes. 0 to disable
    ; body: any        // request body. can be a string, buffer, readable stream
    ; agent?: null;        // http.Agent instance, allows custom proxy, certificate etc.
}

/**
 * proxyRequester:
 * Method to find existing microservice in RedisDB,
 * and send request to corresponding microservice
 * and return response
 * @param repo Redis instance ready
 */
const proxyRequester = (repo) => express.Router().use(async (req: any, res, next) => {
  console.log('=====================');
  console.log('PROXY REQUESTER', req.path);
  // extract desired url.path
  const path: string = req.url.split('/').filter(param => param !== '').splice(1, 1).join('/');
  // extract existing token
  const token: string = req.get('x-access-token') || req.get('authentication') || req.get('authorization') || undefined;
  const { serverConfig: { backendToken = null } = {}} = req;
  console.log('repo find....', req.url.split('/')[1]);
  // find in repo existing service
  const repoFind = await repo.find(req.url.split('/')[1]).catch(err => err);
  if (!repoFind || repoFind instanceof Error)
    return next({code: 500, message: 'Error Route not existing or unactive: ' + `/${req.url.split('/')[1]}/${path}`, stack: repoFind});
  const {
    // extract label as service from result
    label: service = null,
    host = null,
    // extract port from result
    port = null
  } = repoFind || {};
  const responseStatus = 200;
  if (!host || !port)
    return next({code: 500, message: 'Service not have PORT or HOST' });
  const hostname = (process.env.NODE_ENV === 'production')
    ? `${host}:${port}`
    : `http://${host}:${port}`;
  console.log('request proxy to -->', hostname, req.method.toUpperCase());
  const body = JSON.stringify(req.body);
  const requestOptions: http.RequestOptions = {
    method: req.method.toUpperCase(),
    hostname: hostname.split('//')[1].split(':')[0],
    port: port || hostname.split(':')[2],
    path: '/api/v2/' + path,
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token || '',
      'x-backend-token': backendToken || '',
      'Content-Length': body.length
    },
  };
  const responseProxy = await new Promise((resolve, reject) => {
    const request = http.request(requestOptions, (resp) => {
      let data = '';
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => data += chunk);
      // The whole response has been received. Print out the result.
      resp.on('end', () => resolve(JSON.parse(data || null)));
    })
    .on('error', (err) => reject(err));
    request.write(body);
    request.end();
  }).catch(err => err);
  console.log('-----------------');
  console.log('For host:', hostname, );
  console.log('For path:', '/' + path, );
  // console.log('responseProxy-> ', responseProxy);
  console.log('END OF PROXY REQUESTER');
  return res.status(responseStatus).json(responseProxy);
});

/**
 * Method to add proxy routes to existing express application
 * @param options {repo: any}
 */
export const proxyRoutes = (options: {repo: any}) => {
  // extract repo from options
  const {repo} = options;
  // build server proxy
  return proxyRequester(repo);
};
