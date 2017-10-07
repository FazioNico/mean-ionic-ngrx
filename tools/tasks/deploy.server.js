/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   07-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-10-2017
*/

// Deploy Server Script v.0.0.1

"use strict";

var cp = require('child_process');

preparDeployServer();
deployeServer();

function preparDeployServer(){
  console.log('   [RUN] - Prepare deploy server...')
  try {
    cp.execSync("git add -f ./platforms/server/ && git add --all && git commit -m 'upd version - `date`' && git subtree split -P ./platforms/server/ -b heroku-serve && git rm -r --cached ./platforms/server/ && git add --all && git commit -m 'rm .temp folder'");
  }
  catch (err) {
    console.log("   [ERROR] - Prepare deploy Server error: ", err);
  }
  console.log('   [SUCCESS] -  Prtepare Server with success')
}

function deployeServer(){
  console.log('   [RUN] - Deploy Server to Heroku...')
  try {
    cp.execSync("git push heroku heroku-serve:master --force  && git branch -D heroku-serve && heroku ps:scale web=1 && heroku open");
  }
  catch (err) {
    console.log("   [ERROR] - Deploy Server error: ", err);
  }
  console.log('   [SUCCESS] -  Deploy Sever with success');
}
