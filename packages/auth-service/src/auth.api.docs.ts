/**
 * @api {get} /auth/isauth Request isAuth User
 * @apiName isAuth
 * @apiGroup Auth
 * @apiPermission Authenticate
 * @apiSampleRequest https://backend-stage-agch-agenda-v2.appuioapp.ch/auth/isauth
 * @apiDescription API endpoint to check if user have allready be authenicate.
 * This method return all datas needed to starting Agenda.ch application
 *
 * @apiHeader {String} x-access-token=null
 *
 * @apiSuccess {IAccount[]} accounts User accounts list.
 * @apiSuccess {IPermissions} permissions User application permissions.
 * @apiSuccess {IUser} user Data of the User.
 * @apiSuccess {IUserConfig} userConfig Config of the User.
 * @apiSuccess {String} token Token Authentication.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accounts": [
 *          {
 *            "account": {},
 *            "accountConfig": {}
 *          }
 *       ],
 *       "permissions": {},
 *       "user": {}
 *       "userConfig": {}
 *       "token": "tokenStringExemple"
 *     }
 *
 * @apiError (Error 40X) {Number} code=401|403 Error response server statut code
 * @apiError (Error 40X) {String} message Error explain text
 * @apiErrorExample Error-Response (401):
 *     HTTP/1.1 401 Unauthorized
 *      {
 *          "message": "You need to be authenticated to access this part of the API"
 *          "code": 401
 *      }
 * @apiErrorExample Error-Response (403):
 *     HTTP/1.1 403 Forbidden
        {
            "message": "Authentication check failed",
            "code": 403
        }
 *
 *
 */



/**
 * @api {post} /auth Request to authenticate
 * @apiName Login
 * @apiGroup Auth
 * @apiSampleRequest https://backend-stage-agch-agenda-v2.appuioapp.ch/auth
 * @apiDescription API endpoint to authenticate user.
 *
 * @apiParam {String} email user email
 * @apiParam {String} password user password
 *
 * @apiSuccess {IAccount[]} accounts User accounts list.
 * @apiSuccess {IPermissions} permissions User application permissions.
 * @apiSuccess {IUser} user Data of the User.
 * @apiSuccess {String} token Token Authentication.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accounts": [
 *          {
 *            "account": {},
 *            "accountConfig": {}
 *          }
 *       ],
 *       "permissions": {},
 *       "user": {}
 *       "token": "tokenStringExemple"
 *     }
 *
 * @apiError (Error 40X) {Number} code=400|401|403 Error response server statut code
 * @apiError (Error 40X) {String} message Error explain text
 * @apiErrorExample Error-Response (400):
 *     HTTP/1.1 400 Bad Request
 *      {
 *          "message": "{AuthRepo} Authentication failed. User demo1@demo1.ch not found.",
 *          "code": 400
 *      }
 * @apiErrorExample Error-Response (401):
 *     HTTP/1.1 401 Unauthorized
 *      {
 *          "message": "You need to be authenticated to access this part of the API"
 *          "code": 401
 *      }
 * @apiErrorExample Error-Response (403):
 *     HTTP/1.1 403 Forbidden
        {
            "message": "Authentication check failed",
            "code": 403
        }
 */



/**
 * @api {post} /auth/signin Request create User Account
 * @apiName Signin
 * @apiGroup Auth
 * @apiSampleRequest https://backend-stage-agch-agenda-v2.appuioapp.ch/auth/signin
 * @apiDescription API endpoint to create an AuthUser with UserConfig, Account, AccountConfig, Agenda & Permissions.
 *
 * @apiParam {String} email user email
 * @apiParam {String} password user password
 * @apiParam {String} [firstname] user firstname
 * @apiParam {String} lastname user lastname
 * @apiParam {String} [title] user title
 * @apiParam {String} company user company
 * @apiParam {String} address user address
 * @apiParam {String} zipCode user zipCode
 * @apiParam {String} city user city
 * @apiParam {String} mobile user mobile
 * @apiParam {String} language user language
 *
 * @apiSuccess {IAccount[]} accounts User accounts list.
 * @apiSuccess {IPermissions} permissions User application permissions.
 * @apiSuccess {IUser} user Data of the User.
 * @apiSuccess {String} token Token Authentication.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accounts": [
 *          {
 *            "account": {},
 *            "accountConfig": {}
 *          }
 *       ],
 *       "permissions": {},
 *       "user": {}
 *       "token": "tokenStringExemple"
 *     }
 *
 * @apiError (Error 40X) {Number} code=400|401|403 Error response server statut code
 * @apiError (Error 40X) {String} message Error explain text
 * @apiErrorExample Error-Response (400):
 *     HTTP/1.1 400 Bad Request
 *      {
 *          "message": "{AuthRepo} Authentication failed. User demo1@demo1.ch not found.",
 *          "code": 400
 *      }
 * @apiErrorExample Error-Response (401):
 *     HTTP/1.1 401 Unauthorized
 *      {
 *          "message": "You need to be authenticated to access this part of the API"
 *          "code": 401
 *      }
 * @apiErrorExample Error-Response (403):
 *     HTTP/1.1 403 Forbidden
        {
            "message": "Authentication check failed",
            "code": 403
        }
 */




/**
 * @api {post} /auth/:aid Request create user in existing account
 * @apiName CreateUserInAccount
 * @apiGroup Auth
 * @apiPermission Authenticate + Authorized
 * @apiSampleRequest https://backend-stage-agch-agenda-v2.appuioapp.ch/auth/:aid
 * @apiDescription API endpoint to create an AuthUser with User & UserConfig & Permissions in existing account
 *
 * @apiHeader {String} x-access-token=null
 *
 * @apiParam {String} email user email
 * @apiParam {String} password user password
 * @apiParam {String} [firstname] user firstname
 * @apiParam {String} lastname user lastname
 * @apiParam {String} [title] user title
 * @apiParam {String} mobile user mobile
 * @apiParam {String} language user language
 *
 * @apiSuccess {Auth} auth User authentication data.
 * @apiSuccess {IPermissions} permissions User application permissions.
 * @apiSuccess {IUser} user Data of the User.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "auth": {},
 *       "permissions": {},
 *       "user": {}
 *     }
 *
 * @apiError (Error 40X) {Number} code=401|403 Error response server statut code
 * @apiError (Error 40X) {String} message Error explain text
 * @apiErrorExample Error-Response (401):
 *     HTTP/1.1 401 Unauthorized
 *      {
 *          "message": "You need to be authenticated to access this part of the API"
 *          "code": 401
 *      }
 * @apiErrorExample Error-Response (403):
 *     HTTP/1.1 403 Forbidden
        {
            "message": "Authentication check failed",
            "code": 403
        }
 */




/**
 * @api {put} /auth/:aid Request update user
 * @apiName UpdateUserAccount
 * @apiGroup Auth
 * @apiPermission Authenticate + Authorized
 * @apiSampleRequest https://backend-stage-agch-agenda-v2.appuioapp.ch/auth/:aid
 * @apiDescription API endpoint to update an User.
 *
 * @apiHeader {String} x-access-token=null
 *
 * @apiParam {String} email user email
 * @apiParam {String} [firstname] user firstname
 * @apiParam {String} lastname user lastname
 * @apiParam {String} [title] user title
 * @apiParam {String} company user company
 * @apiParam {String} address user address
 * @apiParam {String} zipCode user zipCode
 * @apiParam {String} city user city
 * @apiParam {String} mobile user mobile
 * @apiParam {String} language user language
 *
 * @apiSuccess {Auth} auth User authentication data.
 * @apiSuccess {IPermissions} permissions User application permissions.
 * @apiSuccess {IUser} user Data of the User.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "auth": {},
 *       "permissions": {},
 *       "user": {}
 *     }
 *
 * @apiError (Error 40X) {Number} code=401|403 Error response server statut code
 * @apiError (Error 40X) {String} message Error explain text
 * @apiErrorExample Error-Response (401):
 *     HTTP/1.1 401 Unauthorized
 *      {
 *          "message": "You need to be authenticated to access this part of the API"
 *          "code": 401
 *      }
 * @apiErrorExample Error-Response (403):
 *     HTTP/1.1 403 Forbidden
        {
            "message": "Authentication check failed",
            "code": 403
        }
 */





/**
 * @api {delete} /auth/:id Request delete user
 * @apiName DeleteUserAccount
 * @apiGroup Auth
 * @apiPermission Authenticate + Authorized
 * @apiSampleRequest https://backend-stage-agch-agenda-v2.appuioapp.ch/auth/:aid
 * @apiDescription API endpoint to delete an User.
 *
 * @apiHeader {String} x-access-token=null
 *
 * @apiParam {String} id user.uid
 *
 * @apiSuccess {Auth} auth User authentication data.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "auth": {},
 *     }
 *
 * @apiError (Error 40X) {Number} code=401|403 Error response server statut code
 * @apiError (Error 40X) {String} message Error explain text
 * @apiErrorExample Error-Response (401):
 *     HTTP/1.1 401 Unauthorized
 *      {
 *          "message": "You need to be authenticated to access this part of the API"
 *          "code": 401
 *      }
 * @apiErrorExample Error-Response (403):
 *     HTTP/1.1 403 Forbidden
        {
            "message": "Authentication check failed",
            "code": 403
        }
 */
