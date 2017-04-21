import { mongoDbConnect } from "./mongodb/mongo";

export class DataBase{

  constructor(){
  }

  static connect(){
    // connect to database
    return new Promise((resolve,reject)=>{
      mongoDbConnect()
        .then((response)=>{
          resolve(response)
        })
        .catch( err =>{
          reject(err)
        })
    })
  }
}
