#!/bin/bash

# Chemin ABSOLU RÉEL
API_PATH="/home/cdiu8226/public_html/formatrack/api"

# Sur o2switch, il vaut mieux utiliser l'alias 'php' qui pointe vers la version choisie dans cPanel
PHP="php"
COMPOSER="composer"

# On s'assure d'être dans le bon dossier
cd "$API_PATH" || { echo "Erreur: Dossier introuvable" >> "$API_PATH/deploy.log"; exit 1; }

echo "--- Déploiement du $(date) ---" >> deploy.log

# 1. Installation des dépendances (On force l'utilisation de Composer avec la bonne version de PHP)
echo "Installation des dépendances..." >> deploy.log
$PHP "$COMPOSER" install --no-dev --optimize-autoloader --no-interaction --no-progress >> deploy.log 2>&1

# 2. Artisan (Migrations, Cache, etc.)
echo "Lancement des commandes Artisan..." >> deploy.log
$PHP artisan key:generate --force >> deploy.log 2>&1
$PHP artisan migrate --force >> deploy.log 2>&1
$PHP artisan storage:link >> deploy.log 2>&1
$PHP artisan config:cache >> deploy.log 2>&1
$PHP artisan route:cache >> deploy.log 2>&1

echo "--- Déploiement Terminé avec succès ---" >> deploy.log
