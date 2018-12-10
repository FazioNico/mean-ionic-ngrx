import { Schema, Document } from 'mongoose';
import fetch from 'node-fetch';

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

export interface IAuth {
  email: string;
}

export interface IAuthDoc extends Document, IAuth {
  password: string;
  _v1?: {
    id?: number;
  };
}

export class Auth implements IAuth {
  email: string;
  _v1?: {
    id?: number;
  };
  constructor(parameters) {
    Object.assign(this, parameters);
  }

  async createUser(body, gatewayHost, token, backendToken) {
    const userRequest = await fetch(`${gatewayHost}/users`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        'x-access-token': token || '',
        'x-backend-token': backendToken || '',
      },
    }).catch(err => err);
    if (userRequest.status !== 200)
      return {code: 400, message: 'User creation failed', stack: userRequest};
    const {user = {}} = await userRequest.json();
    return {user};
  }
}

