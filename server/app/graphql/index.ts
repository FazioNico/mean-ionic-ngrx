/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 13-10-2017
*/


import * as express from 'express';
import * as http  from "http";
import * as expressGraphQL from 'express-graphql';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
// imports form server subscribtions
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from "./types";
import { resolvers } from "./resolvers";

import { log }  from "../log";

const app:express.Application = express();
// console.log(typeDefs)
export const schemas = makeExecutableSchema({
  typeDefs: [...typeDefs],
  resolvers,
});

export class GraphqlApi {
  private server:http.Server;

  constructor(server:http.Server){
    this.server = server
  }

  init(){
    //GraphQL API Endpoints
    app
    // .use(
    //   '/graphql',
    //   expressGraphQL( (req) => {
    //     //console.log('->',req)
    //     return {
    //       graphiql: true,
    //       schema: schemas, //GraphQLSchema,
    //       context: req
    //     }
    //   })
    // )
    .use('/graphql', log, graphqlExpress(req=> ({
      schema:schemas,
      context: req
    })))
    .use('/graphiql', log, graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:8080/subscriptions`,
    }));
    // Real Time SubscriptionServer
    const subscriptionServer = new SubscriptionServer(
      {
        schema: schemas,
        execute,
        subscribe,
      }, {
        server: this.server,
        path: '/subscriptions',
      }
    );
    return app;
  }
}
