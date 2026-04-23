#!/bin/bash

# Chemin absolu sur le serveur
API_PATH="/home/cdiu8226/public_html/formatrack/api"
PHP="/usr/local/bin/php"
COMPOSER="/usr/local/bin/composer"

# On s'assure d'être dans le bon dossier
cd "$API_PATH" || exit

echo "--- Déploiement du $(date) ---" >> deploy.log

# 1. Installation des dépendances
$PHP $COMPOSER install --no-dev --optimize-autoloader >> deploy.log 2>&1

# 2. Artisan
$PHP artisan key:generate --force >> deploy.log 2>&1
$PHP artisan migrate --force >> deploy.log 2>&1
$PHP artisan storage:link >> deploy.log 2>&1
$PHP artisan config:cache >> deploy.log 2>&1
$PHP artisan route:cache >> deploy.log 2>&1

echo "--- Terminé ---" >> deploy.log
