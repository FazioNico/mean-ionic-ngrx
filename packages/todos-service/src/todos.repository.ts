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


  async create(data): Promise<{todo: ITodoDoc}> {
    if (!this._connected) {
      return Promise.reject('{TodosRepo} DB not connected');
    }
    const todo = await new this._model(data).save().catch(err => err);
    if (todo instanceof Error)
      return Promise.reject({message: '{TodosRepo} Error with save Todos into Todos.Collection', stack: todo});
    return {todo};
  }

}