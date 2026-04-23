<?php
/**
 * Hook de déploiement automatique pour o2switch
 * Permet de lancer les commandes Artisan sans SSH.
 */

// 1. Sécurisation via Token
$expectedToken = getenv('DEPLOY_TOKEN') ?: 'A_REPLACER_DANS_LE_ENV_SUR_LE_SERVEUR'; 
$receivedToken = $_GET['token'] ?? '';

if (empty($receivedToken) || $receivedToken !== $expectedToken) {
    header('HTTP/1.0 403 Forbidden');
    die('Accès refusé : Token invalide.');
}

try {
    // 2. Chargement de l'environnement Laravel
    require __DIR__.'/../vendor/autoload.php';
    $app = require_once __DIR__.'/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

    echo "--- Début des tâches post-déploiement ---\n\n";

    // 3. Commandes Artisan
    $commands = [
        'key:generate' => ['--force' => true],
        'migrate'      => ['--force' => true],
        'storage:link' => [],
        'config:cache' => [],
        'route:cache'  => [],
        'view:cache'   => [],
    ];

    foreach ($commands as $command => $params) {
        echo "Exécution : php artisan $command...\n";
        $status = $kernel->call($command, $params);
        echo "Résultat : " . ($status === 0 ? "Succès" : "Échec ($status)") . "\n\n";
    }

    echo "--- Déploiement terminé avec succès ---";

} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo "ERREUR FATALE : " . $e->getMessage();
}
