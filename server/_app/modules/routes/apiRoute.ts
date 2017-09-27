/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-03-2017
*/

import * as express from 'express';
import { TodosRoutes }  from "../api/todos/todosRoutes";
import { UsersRoutes }  from "../api/users/users.routes";

const app = express();

export class APIRoutes {

    routes() {
        app.use("/", new TodosRoutes().routes())
        app.use("/", new UsersRoutes().routes());
        return app;
    }

}
