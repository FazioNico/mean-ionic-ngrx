/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/

import { verify } from 'jsonwebtoken';
// Import secretTokenKey config
import { SECRET_TOKEN_KEY } from "../config";


// export the authentication class:
export class Authentication {
  public static checkAuthentication(req, cb: (isAuth: boolean|any) => void): void {
    // look for the token in the incoming request:
    let token: string = req.body.token || req.query.token ||
      req.get('x-access-token') || req.get('authentication') || undefined;

    if (token === undefined) {
      // there is no token!
      cb(false);
    } else {
      verify(token, SECRET_TOKEN_KEY,  (err: Error, decoded: any): void => {
        if (err) {
          cb(false);
        } else {
          //console.log('req.decoded-> ', decoded._doc._id )
          req.decoded = decoded;
          cb({success:true, user: decoded._doc});
        }
      });
    }
  }

  public static authenticatedRoute(req, res, next): void {
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      if (isAuth) {
        // the user has a proper token: let's call next
        //console.log('isAuth-> ', isAuth )
        next();
      } else {
        console.log('unauthorized access! kicking the client out with 403');
        res.status(403).json({
          message: 'Error: You need to authenticate to access this part of the API',
          success: false
        });
      }
    });
  }
}
