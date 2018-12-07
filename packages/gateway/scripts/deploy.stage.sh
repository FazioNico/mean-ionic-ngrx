#!/bin/sh
# ideas used from https://gist.github.com/motemen/8595451

# Based on https://github.com/eldarlabs/ghpages-deploy-script/blob/master/scripts/deploy-ghpages.sh
# Used with their MIT license https://github.com/eldarlabs/ghpages-deploy-script/blob/master/LICENSE

# abort the script if there is a non-zero error
set -e
# show where we are on the machine
rootDirectory='/home/circleci/repo'
currentService=$(pwd)
currentServiceFolder='apigateway'
echo $rootDirectory
echo $currentService
remote=$(git config remote.origin.url)
# config git user
git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1

cp ./package.json ./dist/package.json
cp ./.npmrc ./dist/.npmrc
cp ./.env.stage ./dist/.env

echo "[INFO]: Finished Prepare Stage application!"
echo "[INFO]: Application Staging Deployment ..."
cd $rootDirectory
# commit changes
git add -f packages/$currentServiceFolder/dist
git add --all
git commit -m 'Prepare ./dist folder [ci skip]'

# git subtree push -P packages/$currentServiceFolder/dist origin stage-accountconfig
git subtree split -P packages/$currentServiceFolder/dist -b stage
git commit --allow-empty -m 'Deploy to Cloud Service [ci skip]'

git rm -r --cached packages/$currentServiceFolder/dist
git add --all
git commit --allow-empty -m 'Deploy to Cloud Service [ci skip]'

git push origin stage:stage-apigateway --force 
git branch -D stage

echo "[SUCCESS]: Finished Stage Deployment for apigateway microservice!"
cd $currentService