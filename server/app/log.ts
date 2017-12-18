/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-12-2017
*/

// Custom log reporter v.0.0.2

export const log = (req,res,next) => {
    if(!!process.env.NODE_ENV && process.env.NODE_ENV === 'prod'){
      next()
      return;
    }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  	console.log(`[info] Logger middleware`);
    console.log("[logger] Request API-> ", req.baseUrl.toString());
    console.log("[logger] Request route path-> ", req._parsedUrl.pathname.toString());
    (req.baseUrl.toString() === '/rest')
      ? console.log(`[logger] Request route params-> ${JSON.stringify(req.params) || null}
[logger] Request route query-> ${JSON.stringify(req.query) || null}`)
      : null;
    console.log(`[logger] Request Headers-> ${JSON.stringify(req.headers, null, 4) || null}`)
    console.log(`[logger] Request Body parms-> ${JSON.stringify(req.body, null, 4) || null}`)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  	next();
}
