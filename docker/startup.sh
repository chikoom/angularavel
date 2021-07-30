#!/bin/sh

sed -i "s,PORT,$PORT,g" /etc/nginx/nginx.conf

/usr/bin/supervisord -c /app/docker/supervisord.conf