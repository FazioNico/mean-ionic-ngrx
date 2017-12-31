/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 31-12-2017
*/

import * as express from 'express';
import { todoController }  from "./todos.controller";
import { log } from '../../../log';

var router = express.Router();

export class TodosRoutes {

    private _TodosController: any;

    constructor () {
        this._TodosController = todoController;
    }

    routes():express.Router {
      var controller = this._TodosController;
      return router
        .get('/todos', log, controller.getItems)
        .get('/todos/:id', log, controller.getItem)
        .post('/todos', log, controller.addItem )
        .put('/todos/:id', log, controller.updateItem )
        .delete('/todos/:id', log, controller.deleteItem )
    }
}
