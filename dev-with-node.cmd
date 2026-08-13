@echo off
REM Launch pnpm dev with nvm-managed node on PATH. Used by the local browser
REM preview tool which spawns the runtime without inheriting shell PATH.
set "PATH=C:\Users\dines\AppData\Local\nvm\v22.23.1;%PATH%"
cd /d "%~dp0"
"C:\Users\dines\AppData\Local\nvm\v22.23.1\node.exe" "C:\Users\dines\AppData\Roaming\npm\node_modules\pnpm\bin\pnpm.cjs" dev
