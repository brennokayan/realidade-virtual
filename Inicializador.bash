#!/bin/bash

# Caminho para o arquivo de texto com os diretórios
file="paths.txt"

# Ler o arquivo linha por linha
while IFS= read -r line; do
    echo "Navegando para $line"
    
    # Navegar para o diretório
    cd "$line" || exit

    # Executar npm install
    echo "Executando npm install em $line..."
    npm install

    # Executar npm start
    echo "Iniciando o servidor em $line..."
    gnome-terminal -- bash -c "npm run dev; exec bash"
done < "$file"

# Pausar para manter a janela aberta (não necessário no Linux, pois cada comando npm start abre em um novo terminal)
echo "Pressione qualquer tecla para continuar..."
read -n 1 -s
