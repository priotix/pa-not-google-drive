#!/bin/bash

rm -rf /app/*
rsync -a /var/www/app/build/ /app
rsync -a /var/www/app/src/static /app