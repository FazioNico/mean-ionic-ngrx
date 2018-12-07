import * as express from 'express';
import { UsersRepo, toObjectId } from './users.repository';

import { CONFIG } from './config';
import { IUserDoc } from './users.model';
import { extractToken } from './utils';

export class UsersRouter {

  repo: UsersRepo;
  router: express.Router = express.Router();
  serverConfig: CONFIG.IServerConfig;
  middlewares: {(req, res, next)}[] = [];

  constructor (datas) {
    Object.assign(this, datas);
  }

  async getRoutes() {
    const MIDDLEWARES = [
      ...this.middlewares,
    ];
    return this.router
    /**
    * @api {get} /test Testing route
    */
    .get('/test', async(req: express.Request, res: express.Response, next: express.NextFunction) => {
      return res.status(200).json({code: 200, message: 'work!'});
    })

    .get('/:id', MIDDLEWARES, async(req: express.Request, res: express.Response, next: express.NextFunction) => {
      const token: string = extractToken(req);
      const { id = null } = req.params;
      if (!id) return next({code: 400, message: 'Unexisting user ID'});
      const {user = {}} = await this.repo.getById(toObjectId(id)).catch(err => err);
      if (!user.uid)
        return next({code: 400, message: 'User not found'});
      return res.status(200).json({user, token});
    })

    .post('/', MIDDLEWARES, async(req: express.Request, res: express.Response, next: express.NextFunction) => {
      const token: string = extractToken(req) || null;
      const result = { user: null as IUserDoc, token } ;
      const userResponse = await this.repo.create(req.body).catch(err => err);
      console.log('------>', userResponse);
      // handle error response from _controller
      if (!userResponse.user) return next({code: 400, message: '{UsersRouter} User creation failed'});
      result.user = userResponse.user;
      res.status(200).json(result);
    });
  }
}
