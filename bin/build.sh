#!/bin/bash -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR} && cd ..

zip --exclude=*.DS_Store* --exclude=*bin* --exclude=*.git* --exclude=*.iml --exclude=*.afdesign --exclude=*.idea* --exclude=LICENSE --exclude=README.md -r raygun2jira.zip .

echo "";
echo "raygun2jira.zip written";
echo "";

cd $PWD



