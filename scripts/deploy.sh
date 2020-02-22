#!/bin/bash

echo
tput setaf 2
echo "###################"
echo "Starting deployment"
echo "###################"
tput sgr0
echo

# SSH into server
ssh -i "default.pem" ubuntu@3.87.14.203 << 'ENDSSH'

echo
/bin/echo -e "\e[36mPull the newest code from origin master\e[0m"
cd workspace/yntht/
git reset --hard master
git pull

echo
/bin/echo -e "\e[36m###################\e[0m"
/bin/echo -e "\e[36mDeploying commit:\e[0m"
git log -1 --pretty=%B
/bin/echo -e "\e[36m###################\e[0m"
echo

echo
/bin/echo -e "\e[36mInstall dependencies, build frontend, and move it to the backend directory\e[0m"
cd yntht-frontend
npm install
npm run build
rm -rf ../yntht-backend/build/
mv build ../yntht-backend/

echo
/bin/echo -e "\e[36mInstall backend dependencies\e[0m"
cd ../yntht-backend
npm install

echo
/bin/echo -e "\e[36mReload the app with pm2\e[0m"
pm2 reload yntht

# Exit Server
ENDSSH

echo
tput setaf 2
echo "###################"
echo "Deployment Complete"
echo "###################"
tput sgr0
echo
