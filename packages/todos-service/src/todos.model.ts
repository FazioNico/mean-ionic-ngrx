import { Schema, Document } from 'mongoose';

export const todoSchema = new Schema({
  description: { type: String, required: true  },
  isComplete: {
    type: Boolean,
    default: false
  },
  deadline: { type: Number, default: Date.now() },
  expire: { type: Boolean, default: false },
  uid: { type: String, required: true  }
});

export interface ITodoDoc extends Document {
  description: string;
  isComplete: boolean;
  user_id: string;
  deadline?: number;
  expire?: boolean;
  _v1?: {
    id?: number;
  };
}

