/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-12-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-12-2017
 */

 import { MongoosDataBase } from "./mongoose";

 export function Database():Promise<any[]>{
   return Promise.all([
     MongoosDataBase.connect(),
     // can add other database here (PostgreSQL; elephantSQL; couchDB; SQL; etc...).
     // Each DB need static async methode to return Promise

   ])
 }
