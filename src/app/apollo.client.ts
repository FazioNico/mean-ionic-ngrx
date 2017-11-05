/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-11-2017
*/

/**
 * !!!!!!!!!!!!!!!!
 * Deprecate Files: use graphql.module.ts (Apollo v2.0.1)
  * !!!!!!!!!!!!!!!!
 */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
// import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';
import { environmentFactory} from './environment/environment.module';

/**
 * Apollo CLient 2.0.0
 * with subscriptions-transport-ws >0.9.0
 * ::: Currently not working :::
 * Using GraphQL Observable realTime database.
 * will soon implemented with new version of apollo-client v.2.0
 * but right now (10-10-2017), still in beta version (beta.0.0.4)
 * and have many bug and issues with package dependencies yet.
 * keep waiting for release of Apollo CLient v.2.0.0 ...
 *
 * See issues and info:
 *  => https://github.com/apollographql/subscriptions-transport-ws/issues/275
 *  => https://github.com/apollographql/subscriptions-transport-ws/issues/276
 *  => https://github.com/howtographql/howtographql/issues/226
 *  => https://medium.com/@SunCerberus/setup-apollo-client-2-0-with-websocket-example-a879ca81aa83
 *  => https://www.npmjs.com/package/apollo-link-ws
 *  => https://www.npmjs.com/package/apollo-link-http
 */

// import {SubscriptionClient} from 'subscriptions-transport-ws';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import WSLink from "apollo-link-ws";

// GraphQL via Apollo
const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql' });
// const wsLink = new WSLink({ uri: 'ws://localhost:8080/subscriptions' });
const middlewareLink = new ApolloLink((operation, forward:any) => {
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

export function provideClient(): {link:ApolloLink, cache:InMemoryCache} {
  return client;
}
// const realTime = new ApolloClient(link);
// export function provideClient(): ApolloClient {
//   return realTime;
// }

/**
 * Apollo Client v.1.9.3
 * with subscriptions-transport-ws <= 0.8.3
 */
// Create GraphQL network Interface with your GraphQL server endpoint
// const networkInterface = createNetworkInterface({
//   uri: environmentFactory().apiEndpoint+'/graphql' //'http://localhost:8080/graphql' t
// });
// // Apply middleware to all http request:
// // add token from localstorage into headers.authorization
// networkInterface.use([{
//   applyMiddleware(req:any, next:any) {
//     if (!req.options.headers) {
//       req.options.headers = {};  // Create the header object if needed.
//     }
//     // get the authentication token from local storage if it exists
//     req.options.headers.authorization = JSON.parse(localStorage.getItem('authTokenTest')|| '') || null;
//     next();
//   }
// }]);

/**
 * SubscriptionClient not working right now with
 * SubscriptionServer from subscriptions-transport-ws >0.9.0
 */
// // Create WebSocket client
// const wsClient = new SubscriptionClient(`ws://localhost:8080/subscriptions`, {
//     reconnect: true,
//     connectionParams: {
//         // Pass any arguments you want for initialization
//     }
// });
// // Extend the network interface with the WebSocket
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//     networkInterface,
//     wsClient
// );

// // Apollo Client Interface definition
// const client:ApolloClient = new ApolloClient({
//   networkInterface //: networkInterfaceWithSubscriptions
// });
// // definefunction to return Apollo Client Interface
// export function provideClient(): ApolloClient {
//   return client;
// }
