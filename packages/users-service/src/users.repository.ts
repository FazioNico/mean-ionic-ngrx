import { IUserDoc, userSchema } from './users.model';
import { Mongoose, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';

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
/**
 * Methode to generate usertoken from value
 * @param secretToken string Secret String from backend to generate/verify user token
 * @param expire number TimeStampe of token expiration
 * @param doc any Object with value to generate user token
 */
export const getToken = (
  secretToken = null,
  expire = null,
  doc: {email: string, _id: string} | any = {}
): string => {
  // prevent unexisting value
  if (! doc._id || !doc.email) return '';
  // prepare payload
  // TODO: addcurrent accountID
  const payload = {_id: doc._id, email: doc.email};
  // create new token with params
  return jwt.sign(payload, secretToken, {
    expiresIn: +expire // use jwtExpire as number type
});
};

export class UsersRepo {

  private _model: Model<IUserDoc>;
  private _connected = true;
  private _db: Mongoose;
  private _serverConfig;

  public get model() {
    return this._model;
  }

  public get serverConfig() {
    return this._serverConfig;
  }

  init(db: Mongoose, serverConfig: any): Promise<UsersRepo> {
    if (!db)
      return Promise.reject('{UserRepo} DB not available!');

    if (db.connection.readyState !== 1)
      return Promise.reject('{UserRepo} DB not connected!');

    if (!serverConfig)
      return Promise.reject('{UserRepo} Auth repository must be started with server configuration');
    this._serverConfig = serverConfig;

    db.connection.once('disconnect', () => {
      this._connected = false;
    });

    this._db = db;
    this._model = this._db.model<IUserDoc>('users', userSchema);

    return Promise.resolve(this);
  }


  public getToken(doc): string {
    return getToken(this._serverConfig.secretTokent,
                    +this._serverConfig.jwtExpire,
                    doc);
  }

  async getById(id): Promise<{user: IUserDoc }> {
    if (!this._connected) {
      return Promise.reject('{UserRepo} DB not connected');
    }
    const user = await this._model.findOne({uid: toObjectId(id)});
    if (!user || user instanceof Error)
      return Promise.reject(`{UserRepo} getById failed. User don't exist.`);
    return {user};
  }

  public async create(data): Promise<{user: IUserDoc}> {
    let user = await this._model.findOne({email: data.email});
    if (user instanceof Error)
      return Promise.reject({code: 400, message: `{UserRepo} An error occured fetching a data with email: ${data.email}`, stack: user});
    if (user)
      return Promise.reject({code: 400, message: '{UserRepo} User already exists'});
    if (!data._id || data._id === 'new')
      delete data._id;
    data.created = new Date();
    user = await new this._model(data).save();
    if (user instanceof Error)
      return Promise.reject({code: 400, message: '{UserRepo} Error with save newUser into Users._model', stack: user});
    return {user};
  }

}
