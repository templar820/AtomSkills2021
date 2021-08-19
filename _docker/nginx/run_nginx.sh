#!/usr/bin/env bash

echo "################################## Run nginx"
export DOLLAR='$'
envsubst < ./template_nginx.conf > /etc/nginx/conf.d/default.conf # /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"