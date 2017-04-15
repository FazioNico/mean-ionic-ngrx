/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-03-2017
*/

import * as express from 'express';
import { log } from '../log';


const app = express();

export class ServerRoutes {

    routes() {
      // Index Server
     app.get('/', log, (req, res)=>{
        res.status(200);
        res.json([{api: 'Hello!'}]);
       });
      return app;
    }
}
