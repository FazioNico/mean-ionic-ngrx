export interface IUserModel {
  _id: string;
  email: string;
  password?: string | null;
  lastname: string;
  firstname?: string;
  uid: string; // user ID
  aids?: string[]; // accounts ID
  permissions: any; // permissions object {}
  title?: string; // M. || Mme
  address?: string;
  address2?: string;
  zipCode?: string;
  city?: string;
  mobile?: string; // mobile phone
  language?: string; // fr; en; de
  created?: Date;
}

export class User implements IUserModel {

  _id: string;
  email: string;
  password?: string | null;
  lastname: string;
  firstname?: string;
  uid: string; // user ID
  aids?: string[]; // accounts ID
  permissions: any; // permissions object {}
  title?: string; // M. || Mme
  address?: string;
  address2?: string;
  zipCode?: string;
  city?: string;
  mobile?: string;
  language?: string; // fr; en; de
  created?: Date;

  constructor({
    _id,
    email,
    password,
    lastname,
    firstname,
    uid,
    aids,
    permissions,
    title,
    address,
    address2,
    zipCode,
    city,
    mobile,
    language,
    created,
  }: IUserModel) {
    this._id = _id || 'new';
    this.email = email;
    this.password = password;
    this.lastname = lastname;
    this.firstname = firstname;
    this.uid = uid;
    this.aids = aids;
    this.permissions = permissions;
    this.title = title;
    this.address = address;
    this.address2 = address2;
    this.zipCode = zipCode;
    this.city = city;
    this.mobile = mobile;
    this.language = language;
    this.created = created;
  }
}

export interface IUsersModel extends Array<User> {}
