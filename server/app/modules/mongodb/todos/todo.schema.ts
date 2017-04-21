/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 20-04-2017
*/

import * as mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({
  	description: { type: String, required: true  },
    isComplete: {
      type: Boolean,
      default: false
    },
    deadline: { type: Number, default: Date.now() },
    expire: { type: Boolean, default: false },
    user_id: { type: String, required: true  }
});
