#!/bin/bash

# Version key/value should be on his own line
DIR=$(pwd)
cd ..
echo $(pwd)
#
#rm -rf zips/*
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

zipPath="${DIR}/../../dist/acfun-helper-abyss-${PACKAGE_VERSION}.zip"
echo $zipPath
npm run build
cd dist
zip -r -D $zipPath *