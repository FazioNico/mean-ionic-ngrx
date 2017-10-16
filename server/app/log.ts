/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 13-10-2017
*/

// Custom log reporter v.0.0.2

export const log = (req,res,next) => {
  	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Query API-> ", req.baseUrl.toString());
    console.log("Query route path-> ", req._parsedUrl.pathname.toString());
    (req.baseUrl.toString() === '/rest')
      ? console.log(`Query route params-> ${JSON.stringify(req.params) || null}
Query route query-> ${JSON.stringify(req.query) || null}`)
      : null;
  	next();
}
