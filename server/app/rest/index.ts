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

const app = express();

export class RestApi {

    init() {
        app.use("/rest/", new TodosRoutes().routes())
        app.use("/rest/", new UsersRoutes().routes());
        return app;
    }

}
