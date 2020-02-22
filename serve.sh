#!/usr/bin/env bash

pm2 delete server
pm2 delete socket-doc

pm2 start --name server npm -- start
pm2 start --name socket-doc socket-doc.js