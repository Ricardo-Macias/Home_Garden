#!/bin/bash

cd home_garden
npx expo start -c &

expo_pid=$!
echo "Expo con PID: $expo_pid"

sleep 5
if [ -f ".gitignore" ]; then
    rm .gitignore
fi