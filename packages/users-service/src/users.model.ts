import { Schema, Document } from 'mongoose';

export const userSchema: Schema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'auths',
    required: true,
    index: true,
  },
  email: {
      type: String,
      require: true,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      index: true,
  },
  lastname: {
      type: String,
      required: false
  },
  firstname: {
      type: String,
      require: false,
  },
  created: {
     type: Date,
     required: true,
     default: new Date()
  },
  address: {
    type: String,
    required: false,
  },
  address2: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  }
});


export interface IUserDoc extends Document {
    uid: Schema.Types.ObjectId;
    email: string;
    title?: string;
    lastname?: string;
    firstname?: string;
    address?: string;
    address2?: string;
    zipCode?: string;
    city?: string;
    mobile?: string;
    language?: string;
    created?: Date;
}

