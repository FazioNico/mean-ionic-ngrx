/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-10-2017
*/

import * as express from 'express';
import { TodosRoutes }  from "./api/todos/todosRoutes";
import { UsersRoutes }  from "./api/users/users.routes";
import { responseNormalizer, errorHandler } from "../config";

const app = express();

export class RestApi {
  
    init() {
      return app
        .get("/rest", (req,res)=> {
          res.json(responseNormalizer(200, null, 'REST API default endpoint'));
        })
        .use("/rest/", new TodosRoutes().routes())
        .use("/rest/", new UsersRoutes().routes())
        .use(errorHandler);
    }
}
