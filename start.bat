@echo off
title Vish Birthday Experience
echo Starting Vish Birthday Experience...
echo Opening in default browser...
start http://127.0.0.1:8080/index.html
npx -y http-server -p 8080 -c-1
pause
