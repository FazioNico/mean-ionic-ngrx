/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 31-12-2017
*/

import * as express from 'express';

import { userController }  from "./users.controller";
import { log } from '../../../log';
import {Authentication} from '../../../authentication';
import { userDataValidator } from "./users.validator";

const router = express.Router();

export class UsersRoutes {

    private _UsersController: any;

    constructor () {
        this._UsersController = userController;
    }

    routes():express.Router {
      var controller = this._UsersController;
      router
        // Public Endpoints:
        .get('/setup', log, controller.setup)
        .post('/auth', log, userDataValidator(), controller.auth)
        .get('/isauth', log, controller.isAuth)
        .post('/signup', log, userDataValidator(), controller.signup);
        // Use middleware to set private Endpoints:
      router
        .use(Authentication.authenticatedRoute)
        // Privates Endpoints
        .get('/users', log, controller.getAll)
        .get('/users/:id', log, controller.getUser);
      return router
    }

}
