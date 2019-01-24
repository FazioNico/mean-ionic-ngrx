import * as express from 'express';
import * as jwt from 'jsonwebtoken';
/**
 * extractToken(): Method to safty extract usertoken from http request
 * @param req express.Request Request Class from Express JS
 */
export const extractToken = (req: express.Request): string => {
  if (!req) return '';
  // extract data and prevent unexisting proprety `token`
  const {body = {token: null}, query = {token: null}} = req;
  // extract value from one of thoses
  const token = body.token ||
    query.token ||
    req.get('x-access-token') ||
    req.get('authentication') ||
    req.get('authorization') || null;
  // create arrray with empty value posible
  const maps = {
    'NaN': NaN,
    'null': null,
    'undefined': undefined,
    'Infinity': Infinity,
    '-Infinity': -Infinity
  };
  // return value empty or existing token finded
  return ((token in maps) ? maps[token] : token);
};

/**
 * Methode to generate usertoken from value
 * @param secretToken string Secret String from backend to generate/verify user token
 * @param expire number TimeStampe of token expiration
 * @param doc any Object with value to generate user token
 */
export const getToken = (
  secretToken = null,
  expire = null,
  doc: {email: string, _id: string} | any = {}
): string => {
  // prevent unexisting value
  if (! doc._id || !doc.email) return '';
  // prepare payload
  // TODO: addcurrent accountID
  const payload = {_id: doc._id, email: doc.email};
  // create new token with params
  return jwt.sign(payload, secretToken, {
    expiresIn: +expire // use jwtExpire as number type
});
};

// TODO: Check if is correct... type is unreconized !!!!
export const updateToken = (token, secretToken, expire) => {
try {
  const payload: any = jwt.verify(token, secretToken);
  delete payload.exp;
  delete payload.iat;
  return jwt.sign(payload, secretToken, {
    expiresIn: +expire // use jwtExpire as number type
  });
}
catch (e) {
  return '';
}
};
