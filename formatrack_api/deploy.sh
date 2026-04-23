#!/bin/bash

# Chemin absolu sur le serveur
API_PATH="/home/cdiu8226/formatrack/api"
PHP="/usr/local/bin/php"
COMPOSER="/usr/local/bin/composer"

echo "--- Début du déploiement $(date) ---" >> $API_PATH/deploy.log

cd $API_PATH

# 1. Installation des dépendances
$PHP $COMPOSER install --no-dev --optimize-autoloader >> $API_PATH/deploy.log 2>&1

# 2. GÉNÉRATION DE LA CLÉ
$PHP artisan key:generate --force >> $API_PATH/deploy.log 2>&1

# 3. Migrations et Caches
$PHP artisan migrate --force >> $API_PATH/deploy.log 2>&1
$PHP artisan storage:link >> $API_PATH/deploy.log 2>&1
$PHP artisan config:cache >> $API_PATH/deploy.log 2>&1
$PHP artisan route:cache >> $API_PATH/deploy.log 2>&1

echo "--- Fin du déploiement ---" >> $API_PATH/deploy.log
