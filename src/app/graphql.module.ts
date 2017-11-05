/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   05-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-11-2017
 */

 import { NgModule } from '@angular/core';
 import { HttpClientModule } from '@angular/common/http';
 // Apollo
 import { ApolloModule, Apollo } from 'apollo-angular';
 import { ApolloLink } from 'apollo-link';
 import { createHttpLink } from 'apollo-link-http';
 import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
 import { InMemoryCache } from 'apollo-cache-inmemory';
 // import WSLink from "apollo-link-ws";

 // GraphQL via Apollo v.2.0.1
 const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql' });
 // const wsLink = new WSLink({ uri: 'ws://localhost:8080/subscriptions' });
 const middlewareLink = new ApolloLink((operation:any, forward:any) => {
   operation.setContext({
     headers: {
       authorization: JSON.parse(localStorage.getItem('authTokenTest')|| '') || null
     }
   });
   return forward(operation)
 })
 const link = ApolloLink.from([middlewareLink.concat(httpLink)/*, wsLink*/]);

 export const client = {
   link: link,
   cache: new InMemoryCache()
 };

 @NgModule({
   exports: [
     HttpClientModule,
     ApolloModule,
     HttpLinkModule
   ]
 })
 export class GraphQLModule {
   constructor(
     apollo: Apollo
   ) {
     // create Apollo
     apollo.create(client);
   }
 }
