/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-10-2017
*/

import { ApolloClient, createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql'
});
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    req.options.headers.authorization = JSON.parse(localStorage.getItem('authTokenTest')) || null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
});

export function provideClient(): ApolloClient {
  return client;
}
