@echo off
chcp 65001 >nul
title Pathbuilder 2e Local - Servidor
echo ======================================================
echo   ⚔️  INICIANDO PATHBUILDER 2E LOCAL
echo ======================================================
echo.
echo Abrindo o servidor e o seu navegador em http://localhost:8080...
echo.

cd /d "%~dp0"
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Nao foi possivel compilar o portal React/TypeScript.
    echo Execute "npm install" para preparar as dependencias e tente novamente.
    pause
    exit /b 1
)

python server.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] O servidor encontrou um problema ao iniciar.
    pause
)
