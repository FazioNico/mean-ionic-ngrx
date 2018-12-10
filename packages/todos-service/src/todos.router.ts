import * as express from 'express';
import { TodosRepo } from './todos.repository';
import { CONFIG } from './config';
import { extractToken } from './utils';

export class TodosRouter {

  repo: TodosRepo;
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

    .get('/test', async(req: express.Request, res: express.Response, next: express.NextFunction) => {
      return res.status(200).json({code: 200, message: 'work!'});
    })

    /**
    * @api {get} /todos Get todos of user by uid
    */
    .get('/', MIDDLEWARES, async(req: express.Request, res: express.Response, next: express.NextFunction) => {
      const token: string = extractToken(req);
      // handle unexisting user ID
      const { _id = null } = ((<any>req).decoded || {});
      if (!_id)
        return next({code: 401, message: 'No user ID in Token', stack: (<any>req).decoded});
      const { todos = []} = await this.repo.getAll(_id).catch(err => err);
      return res.status(200).json({todos, token });
    });

  }
}
