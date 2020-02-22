#!/bin/bash

tput setaf 2
echo "###################"
echo "Starting deployment"
echo "###################"
tput sgr0

# SSH into server
ssh -i "default.pem" ubuntu@3.87.14.203 << 'ENDSSH'

# /bin/echo -e "\e[36mTHIS_IS_CYAN_TEXT\e[0m"

/bin/echo -e "\e[36mGo to the repo and clean up the old build\e[0m"
cd workspace/yntht/
rm -rf yntht-backend/build/

/bin/echo -e "\e[36mPull the newest code from origin master\e[0m"
git pull

/bin/echo -e "\e[36mInstall dependencies, build frontend, and move it to the backend directory\e[0m"
cd yntht-frontend
npm install
npm run build
mv build ../yntht-backend/

/bin/echo -e "\e[36mInstall backend dependencies\e[0m"
cd ../yntht-backend
npm install

/bin/echo -e "\e[36mReload the app with pm2\e[0m"
pm2 reload yntht

# Exit Server
ENDSSH

tput setaf 2
echo "###################"
echo "Deployment Complete"
echo "###################"
tput sgr0
