@echo off
call del *.map
call del *.js
call del *.d.ts
call cd "Command"
call del /s *.map
call del /s *.js
call del /s *.d.ts
call cd ..
call cd "Message"
call del /s *.map
call del /s *.js
call del /s *.d.ts
call cd ..