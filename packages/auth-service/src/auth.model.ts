import { Schema, Document } from 'mongoose';

export const authSchema = new Schema({
  password: {
    type: String,
    required: true,
    match: /^\$2[ayb]\$.{56}$/, // bcrypt hash validation
  },
  email: {
    type: String,
    required: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    index: true,
  },
  _v1: {
    id: {
      type: Number,
      required: false
    }
  }
});

export interface IAuthDoc extends Document {
  password: string;
  email: string;
  _v1?: {
    id?: number;
  };
}

