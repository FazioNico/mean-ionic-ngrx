/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   19-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 13-10-2017
 */


 export const typeDef = `

 type Query {
   todo(_id: String): Todo
   todos: [Todo]

   user(_id: String): User
   users: [User]

   auth(email: String!, password: String!): Auth
   isAuth: User
 }
 `;
