#!/bin/bash
cd home_garden
npm install
npm audit fix
cd ..

cd server
npm install
npm audit fix