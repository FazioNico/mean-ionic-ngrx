#!/bin/bash

# abort the script if there is a non-zero error
set -e
# source $(pwd)/scripts/findpackages.sh
latestRef=$(git log origin/master -1 --format="%H")
latestCmt=$(git log -1 --format="%H")
echo $latestRef
echo $latestCmt

packages=$(git diff --name-only ${latestRef} ${latestCmt} -- packages  | awk '{ split($0,a,/\//); print a[1]"/"a[2] }' | uniq )

echo  $packages | sed 's#.*/##'

# defin project rootDirectory
rootDirectory=$(pwd)
# do loop for each microservice updated  into packages folder
for dir in $packages; do
  # go to microservice folder
  cd "$dir"
  echo $(pwd)
  serviceName=$(pwd | sed 's#.*/##')
  echo "[RUN TEST] ${serviceName} microservice: test runing..."
  # install project dependencies
  npm run test:ci
  cd "$rootDirectory"
done