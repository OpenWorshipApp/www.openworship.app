#!/usr/bin/env bash

source ./.env

npm run build

export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY
export AWS_REGION
export AWS_BUCKET_NAME
export AWS_DISTRIBUTION_ID

node ./push.mjs ./dist