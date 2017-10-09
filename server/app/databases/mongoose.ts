/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-10-2017
*/


import * as mongoose from 'mongoose';
import { CONFIG } from "../config";
// import * as Bluebird from 'bluebird';

export class DataBase{

  constructor(){
  }

  static connect(){

    //mongoose.Promise = global.Promise;
    // (<any>mongoose).Promise = Bluebird.Promise;
    (<any>mongoose).Promise = global.Promise;
    return mongoose.connect( CONFIG.database.HOST, {useMongoClient: true})
  }
}
