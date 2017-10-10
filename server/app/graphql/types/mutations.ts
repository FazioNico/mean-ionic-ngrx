/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   19-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-10-2017
 */

 export const typeDef = `

 type Mutation {
   addTodo(description: String, deadline: String, user_id:String): Todo
   updateTodo(_id: String!, description: String, isComplete: Boolean, deadline: String, expire: Boolean, user_id:String): Todo
   deleteTodo(_id: String!): Status

   addUser(email: String!, password: String!): User
   updateUser(_id: String!, admin: Boolean): User
   deleteUser(_id: String!): Status
 }
 `;
