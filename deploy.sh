#!/bin/bash

# Update the code
echo "REMOTE_USER=$REMOTE_USER" > install.sh
echo "cd $APP_DIR" >> install.sh
echo "git init" >> install.sh
echo "git config core.sshCommand \"ssh -o IdentitiesOnly=yes -i $REMOTE_IDENTITY -F /dev/null\"" >> install.sh
echo "git remote add origin $REPO_URL" >> install.sh
echo "git fetch" >> install.sh
echo "git pull $REPO_URL" >> install.sh

# setup .env
echo "rm .env" >> install.sh
echo "echo PORT=$PORT >> .env" >> install.sh
echo "echo NODE_ENV=$NODE_ENV >> .env" >> install.sh
echo "echo HOST=https://yep.yemaachi.com >> .env" >> install.sh
echo "echo DATABASE_URL=$DATABASE_URL >> .env" >> install.sh
echo "echo EMAIL_USER=$EMAIL_USER >> .env" >> install.sh
echo "echo EMAIL_PASS=$EMAIL_PASS >> .env" >> install.sh
echo "echo GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID >> .env" >> install.sh
echo "echo GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET >> .env" >> install.sh
echo "echo GOOGLE_REDIRECT_URI=$GOOGLE_REDIRECT_URI >> .env" >> install.sh
echo "echo GOOGLE_CLOUD_BUCKET=$GOOGLE_CLOUD_BUCKET >> .env" >> install.sh
echo "echo JWT_SECRET=$JWT_SECRET >> .env" >> install.sh
echo "echo VIAL_URL=\"$VIAL_URL\" >> .env" >> install.sh
echo "echo VIAL_API_KEY=\"$VIAL_API_KEY\" >> .env" >> install.sh
echo "echo UVOSYO_URL=\"$UVOSYO_URL\" >> .env" >> install.sh
echo "echo UVOSYO_API_KEY=\"$UVOSYO_API_KEY\" >> .env" >> install.sh

# setup upload.json
echo "rm src/upload.json" >> install.sh
echo "echo $UPLOAD_JSON >> src/upload.json" >> install.sh

# run code
echo "yarn" >> install.sh
echo "yarn run:migration" >> install.sh
echo "yarn run:seed" >> install.sh
echo "yarn start" >> install.sh