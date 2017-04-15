/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/

import * as express from 'express';
import { userController }  from "../../mongodb/users/users.controller";
import { log } from '../../log';
import {Authentication} from '../../authentication';

const router = express.Router();

export class UsersRoutes {

    private _UsersController: any;

    constructor () {
        this._UsersController = userController;
    }

    routes() {
        var controller = this._UsersController;
        // Public Endpoints:
        router.get('/setup', log, controller.setup)
        router.post('/auth', log, controller.auth)
        router.get('/isauth', log, controller.isAuth)
        router.post('/signup', log, controller.signup)

        // Use middleware to set private Endpoints:
        router.use(Authentication.authenticatedRoute);

        // Privates Endpoints
        router.get('/users', log, controller.getAll)
        router.get('/users/:id', log, controller.getUser)

        // then return the user router
        return router;
    }

}
