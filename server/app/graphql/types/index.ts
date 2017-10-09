/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-10-2017
*/

import * as todoType from "./todo.type";
import * as userType from "./user.type";
import * as commonType from "./common.type";
import * as queryType from "./queries";
import * as mutationsType from "./mutations";
import * as subscribType from "./subscrib";

const typesModules = [
  todoType,
  userType,
  commonType,
  queryType,
  mutationsType,
  subscribType,
];

const mainDefs = [`
  schema {
    query: Query,
    mutation: Mutation
    subscription: Subscription
  }
  `,
];

export const typeDefs = [
  ...mainDefs,
  ...typesModules.map((m) => m.typeDef)
  .filter((res) => !!res)
];
