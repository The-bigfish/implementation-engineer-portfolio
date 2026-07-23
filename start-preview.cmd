@echo off
setlocal
cd /d "%~dp0"
set "NODE_EXE=C:\Users\HaveMoney\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%NODE_EXE%" (
  echo Node runtime not found:
  echo %NODE_EXE%
  pause
  exit /b 1
)

if not exist "dist\index.html" (
  "%NODE_EXE%" "node_modules\vite\bin\vite.js" build
)

echo.
echo Personal resume site preview:
echo http://127.0.0.1:4173/
echo.
echo Keep this window open while previewing.
echo.
"%NODE_EXE%" "scripts\serve-dist.mjs"
