<?php
/**
 * Hook de déploiement ultra-robuste pour o2switch
 */

// 1. Sécurisation
$expectedToken = getenv('DEPLOY_TOKEN') ?: 'VOTRE_TOKEN_ICI'; 
$receivedToken = $_GET['token'] ?? '';

if (empty($receivedToken) || $receivedToken !== $expectedToken) {
    header('HTTP/1.0 403 Forbidden');
    die('Erreur : Token invalide.');
}

// 2. Fonctions utilitaires
function run($cmd) {
    echo "Exécution : $cmd\n";
    $output = shell_exec($cmd . " 2>&1");
    echo $output . "\n";
    return strpos($output, 'error') === false;
}

header('Content-Type: text/plain');
echo "--- Début du Post-Déploiement ---\n\n";

// 3. Détection du chemin PHP sur o2switch
$php = '/usr/local/bin/php';

// 4. Exécution des commandes via shell_exec (pas besoin de Laravel chargé)
run("$php /usr/local/bin/composer install --no-dev --optimize-autoloader");
run("$php artisan key:generate --force");
run("$php artisan migrate --force");
run("$php artisan storage:link");
run("$php artisan config:cache");
run("$php artisan route:cache");

echo "\n--- Terminé ---";
