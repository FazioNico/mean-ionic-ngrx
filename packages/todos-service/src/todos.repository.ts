import { ITodoDoc, todoSchema } from './todos.model';
import { Mongoose, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import { getToken } from './utils';

/**
 * Methode to generate/convert value to Mongoose.ObjectID
 * @param _id any Data to convert to objectID
 * @return mongoose.Types.ObjectId | null
 */
export const toObjectId = (_id: any): mongoose.Types.ObjectId | null => {
  return (mongoose.Types.ObjectId.isValid(_id))
    ? (typeof _id === 'string') ? mongoose.Types.ObjectId.createFromHexString(_id) : _id
    : null;
};

export class TodosRepo {

  private _model: Model<ITodoDoc>;
  private _connected = true;
  private _db: Mongoose;
  private _serverConfig;

  public get model() {
    return this._model;
  }

  public get serverConfig() {
    return this._serverConfig;
  }

  init(db: Mongoose, serverConfig: any): Promise<TodosRepo> {
    if (!db)
      return Promise.reject('{TodosRepo} DB not available!');

    if (db.connection.readyState !== 1)
      return Promise.reject('{TodosRepo} DB not connected!');

    if (!serverConfig)
      return Promise.reject('{TodosRepo} Todos repository must be started with server configuration');
    this._serverConfig = serverConfig;

    db.connection.once('disconnect', () => {
      this._connected = false;
    });

    this._db = db;
    this._model = this._db.model<ITodoDoc>('auths', todoSchema);

    return Promise.resolve(this);
  }

  private _comparePassword(docPassword: string, password: string): boolean {
    if (!docPassword) {
      return false;
    }
    return bcrypt.compareSync(  password , docPassword);
  }

  public getToken(doc): string {
    return getToken(this._serverConfig.secretTokent,
                    +this._serverConfig.jwtExpire,
                    doc);
  }

  async getAll(id): Promise<{todos: ITodoDoc[] }> {
    if (!this._connected) {
      return Promise.reject('{TodosRepo} DB not connected');
    }

    const todos = await this._model.find({uid: toObjectId(id)});
    if (!todos || todos instanceof Error)
      return Promise.reject(`{TodosRepo} isAuth failed. User don't exist.`);
    return {todos};
  }


  // async create(data): Promise<{auth: IAuthDoc}> {
  //   if (!this._connected) {
  //     return Promise.reject('{TodosRepo} DB not connected');
  //   }

  //   const {email, password} = data;
  //   if (!email || !password) {
  //     return Promise.reject('{TodosRepo} TodosUser creation failed. Form fiels error');
  //   }

  //   // check if user already exist...
  //   let auth = await this._model.findOne({email});
  //   if (auth instanceof Error)
  //     return Promise.reject('{TodosRepo} TodosUser creation error');
  //   if (auth)
  //     return Promise.reject('{TodosRepo} User email already exists');

  //   let hash = '';
  //   try {
  //     hash = bcrypt.hashSync(password, 10);
  //   } catch (err) {
  //     return Promise.reject('{TodosRepo} Error with bcrypt hash password');
  //   }

  //   auth = await new this._model({email, password: hash}).save();
  //   if (auth instanceof Error)
  //     return Promise.reject('{TodosRepo} Error with save TodosUser into Todos.Collection');
  //   return {auth};
  // }


  // async update(id: string, data: any): Promise<{auth: IAuthDoc}> {
  //   if (!this._connected) {
  //     return Promise.reject({code: 400, message: '{TodosRepo} DB not connected'});
  //   }

  //   if (!id) {
  //     return Promise.reject({code: 400, message: '{TodosRepo} Object id not provided'});
  //   }

  //   if (data) {
  //     delete data.created;
  //     delete data._id;
  //     delete data.__v;
  //   }

  //   if (!data || Object.keys(data).length === 0) {
  //     return Promise.reject({code: 400, message: '{TodosRepo} Values to update not provided'});
  //   }

  //   if (data.password) {
  //     try {
  //       data.password = bcrypt.hashSync(data.password, 10);
  //     } catch (err) {
  //       return Promise.reject({code: 400, message: '{TodosRepo} Error with bcrypt hash password'});
  //     }
  //   }
  //   else {
  //     // remove password property (prevent insertion of null or empty value)
  //     delete data.password;
  //   }

  //   const auth = await this._model.findOneAndUpdate({_id: toObjectId(id)}, data, {new: true});
  //   if (auth instanceof Error)
  //     return Promise.reject({code: 400, message: '{TodosRepo} Error with update TodosUser'});
  //   return {auth};
  // }

  // async delete(id: string): Promise<{auth: IAuthDoc}> {
  //   if (!this._connected) {
  //     return Promise.reject({code: 400, message: '{TodosRepo} DB not connected'});
  //   }

  //   if (!id) {
  //     return Promise.reject({code: 400, message: '{TodosRepo} Object id not provided'});
  //   }

  //   const auth = await this._model.findOneAndRemove({_id: toObjectId(id)});
  //   if (auth instanceof Error)
  //     return Promise.reject({code: 400, message: '{TodosRepo} Unable to delete TodosUser'});
  //   return {auth};
  // }
}
