#!/bin/bash

# Chemin absolu mis à jour pour public_html
API_PATH="/home/cdiu8226/public_html/formatrack/api"
PHP="/usr/local/bin/php"
COMPOSER="/usr/local/bin/composer"

echo "--- Début du déploiement $(date) ---" >> $API_PATH/deploy.log

cd $API_PATH

# 1. Installation des dépendances
$PHP $COMPOSER install --no-dev --optimize-autoloader >> $API_PATH/deploy.log 2>&1

# 2. Commandes Laravel
$PHP artisan key:generate --force >> $API_PATH/deploy.log 2>&1
$PHP artisan migrate --force >> $API_PATH/deploy.log 2>&1
$PHP artisan storage:link >> $API_PATH/deploy.log 2>&1
$PHP artisan config:cache >> $API_PATH/deploy.log 2>&1
$PHP artisan route:cache >> $API_PATH/deploy.log 2>&1

echo "--- Fin du déploiement ---" >> $API_PATH/deploy.log
