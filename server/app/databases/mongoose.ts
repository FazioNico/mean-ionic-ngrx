/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-12-2017
*/


import * as mongoose from 'mongoose';
import { CONFIG } from "../config";

export class MongoosDataBase{

  static connect(){
    (<any>mongoose).Promise = global.Promise;
    return mongoose.connect( CONFIG.database.HOST, {useMongoClient: true,poolSize: 3 })
  }
}
