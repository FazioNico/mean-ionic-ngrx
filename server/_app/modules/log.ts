/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 24-12-2016
*/

export const log = (req,res,next) => {
  	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Query route path-> ", req.route.path);
    console.log("Query route params-> ", req.params);
    console.log("Query route methode-> ", req.route.methods);
  	next();
}
