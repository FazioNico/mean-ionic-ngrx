#!/bin/sh
# ideas used from https://gist.github.com/motemen/8595451

# Based on https://github.com/eldarlabs/ghpages-deploy-script/blob/master/scripts/deploy-ghpages.sh
# Used with their MIT license https://github.com/eldarlabs/ghpages-deploy-script/blob/master/LICENSE

# abort the script if there is a non-zero error
set -e
# show where we are on the machine
rootDirectory='/home/circleci/repo'

currentService=$(pwd)
currentServiceFolder='auth'
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

# git subtree push -P packages/$currentServiceFolder/dist origin stage-auth
git subtree split -P packages/$currentServiceFolder/dist -b stage
git commit --allow-empty -m 'Deploy to Cloud Service [ci skip]'

git rm -r --cached packages/$currentServiceFolder/dist
git add --all
git commit --allow-empty -m 'Deploy to Cloud Service [ci skip]'

git push origin stage:stage-auth --force 
git branch -D stage
# devBranch=dev
# masterBranch=master
# releaseBranch=release
# # Copie config files for distribution folder
# cp ./.gitignore ./dist/.gitignore
# # commit changes
# git add -f ./dist
# git add --all
# git commit -m 'Prepare ./dist folder [ci skip]'
# # Create `stage` branch from `dist`folder to trigger Cloud Service
# git subtree split -P dist -b stage
# # rmv from git cache `dist` folder and add it to HEAD
# git rm -r --cached ./dist
# git add --all
# git commit --allow-empty -m 'Deploy to Cloud Service [ci skip]'
# echo "[INFO]: Finished Prepare Stage application!"
# echo "[INFO]: Application Staging Deployment ..."
# # push `stage` branch to github repository specific branch
# git push origin stage:stage-auth --force 
# # delete local bracnch
# git branch -D stage
# # display result message
echo "[SUCCESS]: Finished Stage Deployment for Auth microservice!"
cd $currentService