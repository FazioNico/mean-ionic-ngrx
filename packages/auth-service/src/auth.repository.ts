import { IAuthDoc, authSchema } from './auth.model';
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

export class AuthRepo {

  private _model: Model<IAuthDoc>;
  private _connected = true;
  private _db: Mongoose;
  private _serverConfig;

  public get model() {
    return this._model;
  }

  public get serverConfig() {
    return this._serverConfig;
  }

  init(db: Mongoose, serverConfig: any): Promise<AuthRepo> {
    if (!db)
      return Promise.reject('{AuthRepo} DB not available!');

    if (db.connection.readyState !== 1)
      return Promise.reject('{AuthRepo} DB not connected!');

    if (!serverConfig)
      return Promise.reject('{AuthRepo} Auth repository must be started with server configuration');
    this._serverConfig = serverConfig;

    db.connection.once('disconnect', () => {
      this._connected = false;
    });

    this._db = db;
    this._model = this._db.model<IAuthDoc>('auths', authSchema);

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

  async isAuth(id): Promise<{auth: IAuthDoc }> {
    if (!this._connected) {
      return Promise.reject('{AuthRepo} DB not connected');
    }

    const auth = await this._model.findById(toObjectId(id));
    if (!auth || auth instanceof Error)
      return Promise.reject(`{AuthRepo} isAuth failed. User don't exist.`);
    delete auth.password;
    return {auth};
  }

  async auth(email: string, password: string): Promise<{auth: IAuthDoc, token: string}> {
    if (!this._connected) {
      return Promise.reject('{AuthRepo} DB not connected');
    }
    const auth = await this._model.findOne({email});
    if (!auth)
      return Promise.reject(`{AuthRepo} Authentication failed. User ${email} not found.`);
    if (auth instanceof Error)
      return Promise.reject(`{AuthRepo} An error occured fetching a data with email: ${email}`);

    if (!this._comparePassword(auth.password, password)) {
      return Promise.reject('{AuthRepo} Authentication failed. Error with compare password.');
    }
    const token = this.getToken(auth);
    return {auth, token};
  }

  async create(data): Promise<{auth: IAuthDoc}> {
    if (!this._connected) {
      return Promise.reject('{AuthRepo} DB not connected');
    }

    const {email, password} = data;
    if (!email || !password) {
      return Promise.reject('{AuthRepo} AuthUser creation failed. Form fiels error');
    }

    // check if user already exist...
    let auth = await this._model.findOne({email});
    if (auth instanceof Error)
      return Promise.reject('{AuthRepo} AuthUser creation error');
    if (auth)
      return Promise.reject('{AuthRepo} User email already exists');

    let hash = '';
    try {
      hash = bcrypt.hashSync(password, 10);
    } catch (err) {
      return Promise.reject('{AuthRepo} Error with bcrypt hash password');
    }

    auth = await new this._model({email, password: hash}).save();
    if (auth instanceof Error)
      return Promise.reject('{AuthRepo} Error with save AuthUser into Auth.Collection');
    return {auth};
  }

  async signin(reqBody): Promise<{auth: IAuthDoc, token: string}> {
    if (!this._connected) {
      return Promise.reject('{AuthRepo} DB not connected');
    }

    const {email, password} = reqBody;
    if (!email || !password) {
      return Promise.reject('{AuthRepo} Signin failed. Form fiels error');
    }

    // check if user already exist...
    let auth = await this._model.findOne({email}).catch(err => err);
    if (auth instanceof Error)
      return Promise.reject({code: 400, message: '{AuthRepo} Sign in error'});
    if (auth) {
      console.log('--->', auth);
      return Promise.reject({code: 400, message: '{AuthRepo} User email already exists'});
    }
    let hash = '';
    try {
      hash = bcrypt.hashSync(password, 10);
    } catch (err) {
      return Promise.reject({code: 400, message: '{AuthRepo} Error with bcrypt hash password'});
    }

    auth = await new this._model({email, password: hash}).save();
    if (auth instanceof Error)
      return Promise.reject({code: 400, message: '{AuthRepo} Error with save AuthUser into Auth.Collection'});
    const token = this.getToken(auth);
    return {auth, token};
  }

  async update(id: string, data: any): Promise<{auth: IAuthDoc}> {
    if (!this._connected) {
      return Promise.reject({code: 400, message: '{AuthRepo} DB not connected'});
    }

    if (!id) {
      return Promise.reject({code: 400, message: '{AuthRepo} Object id not provided'});
    }

    if (data) {
      delete data.created;
      delete data._id;
      delete data.__v;
    }

    if (!data || Object.keys(data).length === 0) {
      return Promise.reject({code: 400, message: '{AuthRepo} Values to update not provided'});
    }

    if (data.password) {
      try {
        data.password = bcrypt.hashSync(data.password, 10);
      } catch (err) {
        return Promise.reject({code: 400, message: '{AuthRepo} Error with bcrypt hash password'});
      }
    }
    else {
      // remove password property (prevent insertion of null or empty value)
      delete data.password;
    }

    const auth = await this._model.findOneAndUpdate({_id: toObjectId(id)}, data, {new: true});
    if (auth instanceof Error)
      return Promise.reject({code: 400, message: '{AuthRepo} Error with update AuthUser'});
    return {auth};
  }

  async delete(id: string): Promise<{auth: IAuthDoc}> {
    if (!this._connected) {
      return Promise.reject({code: 400, message: '{AuthRepo} DB not connected'});
    }

    if (!id) {
      return Promise.reject({code: 400, message: '{AuthRepo} Object id not provided'});
    }

    const auth = await this._model.findOneAndRemove({_id: toObjectId(id)});
    if (auth instanceof Error)
      return Promise.reject({code: 400, message: '{AuthRepo} Unable to delete AuthUser'});
    return {auth};
  }
}
