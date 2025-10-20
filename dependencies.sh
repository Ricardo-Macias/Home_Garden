#!/bin/bash
if [ -f "home_garden" ]; then
    cd home_garden
    npm install
    cd ..
fi

if [ -f "server" ]; then
    cd server
    npm install
fi