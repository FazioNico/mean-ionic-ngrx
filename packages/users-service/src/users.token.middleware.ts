import * as express from 'express';
import { updateToken } from './utils';

export const tokenMiddleware = (serverConfig): express.RequestHandler => {
return  (req: express.Request, res: express.Response, next) => {
    const originalJson = res.json;
    const token: string = req.body.token ||
                        req.query.token ||
                        req.get('x-access-token') ||
                        req.get('authentication') ||
                        req.get('authorization');
    res.json = (body?: any): express.Response => {
    // Don't update token for:
    // - Failed requests
    // - Request without token
    // - Responses without body
    // - Auth routes
    if (res.statusCode === 200 && body && token && !req.originalUrl.startsWith('/auth') && typeof body === 'object') {
        body.token = updateToken(token, serverConfig.secretTokent, +serverConfig.jwtExpire);
    }
    return originalJson.call(res, body);
    };
    next();
};
};
