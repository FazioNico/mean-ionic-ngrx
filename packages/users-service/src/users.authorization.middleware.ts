import * as jwt from 'jsonwebtoken';
import { extractToken } from './utils';

export const authenticationMiddleware = {
  checkAuthentication: (req) => {
    // look for the token in the incoming request:
    const token = extractToken(req);
    if (!token || token === undefined || token === 'undefined') {
      return null;
    }
    try {
      const decoded = jwt.verify(token, req.serverConfig.secretTokent);
      req.decoded = decoded;
      return decoded;
    }
    catch (e) {
      return null;
    }
  },

  authenticatedBackendRoute: (req, res, next) => {
    const providedBackendToken = req.get('x-backend-token');
    const expectedBackendToken = (req.serverConfig || {}).backendToken || '---------------NOT-A-TOKEN------------------------';
    if (providedBackendToken !== expectedBackendToken) {
      return next({code: 401, message: 'You need to be authenticated to access this part of the API'});
    }
    next();
  },

  authenticatedRoute: (req, res, next) => {
    const isAuth = authenticationMiddleware.checkAuthentication(req);
    // console.log('authenticatedRoute access', req.path, isAuth);
    if (!isAuth) {
      return next({code: 401, message: 'You need to be authenticated to access this part of the API'});
    }
    next();
  }

};
