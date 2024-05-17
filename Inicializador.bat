@echo off
setlocal enabledelayedexpansion

REM Caminho para o arquivo de texto com os diretórios
set "file=paths.txt"

REM Ler o arquivo linha por linha
for /f "delims=" %%a in (%file%) do (
    set "line=%%a"

    REM Imprimir a linha lida
    echo Navegando para !line!
    
    REM Navegar para o diretório
    cd /d !line!

    REM Executar npm install
    echo Executando npm install em !line!...
    call npm install

    REM Executar npm start
    echo Iniciando o servidor em !line!...
    start cmd /k "npm run dev"
)

REM Pausar para manter a janela aberta
pause
