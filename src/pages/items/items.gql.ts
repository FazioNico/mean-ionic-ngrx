/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   10-10-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 11-10-2017
 */


 import gql from 'graphql-tag';

 /**
  * TypeDefs for request query of all items
  * Return items Collection
  */
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

 /**
  * TypeDefs for update an item
  * required variable object:
  *  {
  *    _id:String!,
  *    description:String,
  *    deadline:String,
  *    user_id:String,
  *    isComplete:Boolean,
  *    expire:Boolean
  *  }
  *  Return item updated
  */
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

 /**
  * TypeDefs for create an item
  * required variable object:
  *  {
  *   description:String
  *  }
  *  Return new item created
  */
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

 /**
  * TypeDefs for delete an item
  * required variable object:
  * {
  *   id:String!
  * }
  * Return item deleted ID
  */
 export const TodoDelete = gql`
   mutation deleteTodo(
     $id:String!
   ){
     deleteTodo (_id:$id) {
       _id
     }
   }
 `;

 /**
  * TypeDefs for request realTime itemAdded
  * Return item added 
  */
 export const TodoAdded = gql`
   subscription todoAdded{
     todoAdded{
       _id
       user_id
       isComplete
       description
       deadline
       expire
     }
   }
 `;
