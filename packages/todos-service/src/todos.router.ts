import * as express from 'express';
import { TodosRepo, toObjectId } from './todos.repository';
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
      const findItems = await this.repo.getAll(_id).catch(err => err);
      if (!findItems.todos) return next({code: 400, message: '{TodosRouter} Failed to find toods', stack: findItems});
      const { todos = []} = findItems;
      return res.status(200).json({todos, token });
    })

    /**
    * @api {get} /todos Get todo by ID of user by uid
    */
    .get('/:id', MIDDLEWARES, async(req: express.Request, res: express.Response, next: express.NextFunction) => {
      const token: string = extractToken(req);
      // handle unexisting user ID
      const { _id = null } = ((<any>req).decoded || {});
      if (!_id)
        return next({code: 401, message: 'No user ID in Token', stack: (<any>req).decoded});
      // extract req.params todo ID
      const { id = null } = req.params;
      // handle unexisting todo ID
      if (!id)
        return next({code: 401, message: 'No todo ID', stack: (<any>req).decoded});
      // request repository
      const findItems = await this.repo.getById({userID: _id, todoID: id}).catch(err => err);
      // Handle error
      if (!findItems.todos)
        return next({code: 400, message: '{TodosRouter} Failed to find todos', stack: findItems});
      // extract datas to build response object
      const { todos = []} = findItems;
      // handle unexsisting todo item and return error
      if (todos.length <= 0)
        return next({code: 404, message: '{TodosRouter} Failed to find todo by ID. Unexisting Item.'});
      // return response as json
      return res.status(200).json({todos, token});
    })

    .post('/', MIDDLEWARES, async(req: express.Request, res: express.Response, next: express.NextFunction) => {
      const token: string = extractToken(req) || null;
      // handle unexisting user ID
      const { _id = null } = ((<any>req).decoded || {});
      if (!_id)
        return next({code: 401, message: 'No user ID in Token', stack: (<any>req).decoded});
      const newItem = await this.repo.create({...req.body, uid: _id})
                                     .catch(err => err);
      // handle error response from repository
      if (!newItem.todo) return next({code: 400, message: '{TodosRouter} Todo creation failed', stack: newItem});
      const { todo = null} = newItem;
      res.status(200).json({todo, token});
    });
  }
}
