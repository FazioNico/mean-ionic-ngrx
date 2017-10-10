/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   10-10-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-10-2017
 */


 import gql from 'graphql-tag';

 export const TodosList = gql`
   query TodosList {
     todos {
       _id
       description
       deadline
       expire
       isComplete
     }
   }
 `;
 export const TodoUpdate = gql`
   mutation updateTodo(
     $_id:String!,
     $description:String,
     $deadline:String,
     $user_id:String,
     $isComplete:Boolean,
     $expire:Boolean
   ){
     updateTodo (
       _id:$_id,
       description: $description,
       deadline: $deadline,
       user_id:$user_id,
       isComplete:$isComplete
       expire:$expire
     ) {
       _id
       description
       deadline
       expire
       isComplete
       user_id
     }
   }
 `;
 export const TodoCreate = gql`
   mutation addTodo(
     $description:String
   ){
     addTodo (
       description: $description
     ) {
       _id
       description
       deadline
       expire
       isComplete
       user_id
     }
   }
 `;
 export const TodoDelete = gql`
   mutation deleteTodo(
     $id:String!
   ){
     deleteTodo (_id:$id) {
       _id
     }
   }
 `;
