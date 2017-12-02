@echo off
:ask
set INPUT=
set /P INPUT=Would you like to clean the directory before building (Y/N)? 
If /I "%INPUT%"=="y" goto yes 
If /I "%INPUT%"=="n" goto no
echo Incorrect input & goto Ask
:yes
call clean.bat
echo Cleaned directory
:no
echo Compiling...
call tsc -p "tsconfig.json"
echo Compiled
node --inspect-brk=6969 ../test/app.js