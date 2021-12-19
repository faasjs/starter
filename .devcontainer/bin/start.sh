#!/bin/zsh

concurrently --raw "npm install --prefix /root/app/api && npm run --prefix /root/app/api dev" "npm install --prefix /root/app/www && npm run --prefix /root/app/www dev"
