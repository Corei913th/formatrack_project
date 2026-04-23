<?php
/**
 * Script de maintenance discret
 */
set_time_limit(600);

// 1. Chargement manuel du .env pour récupérer le DEPLOY_TOKEN
$token = 'MonSuperCodeSecret123!';
if (file_exists(__DIR__ . '/../.env')) {
    $lines = file(__DIR__ . '/../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        if (trim($name) === 'DEPLOY_TOKEN') {
            $token = trim($value, " \t\n\r\0\x0B\"");
        }
    }
}

// 2. Vérification (via POST pour plus de discrétion)
$received = $_POST['auth'] ?? '';
if ($received !== $token) {
    header('HTTP/1.0 403 Forbidden');
    die('Unauthorized');
}

// 3. Exécution
function do_cmd($c) {
    echo "Running: $c\n";
    $p = popen("$c 2>&1", 'r');
    while (!feof($p)) {
        echo fread($p, 4096);
        flush();
    }
    pclose($p);
}

header('Content-Type: text/plain');
$p = '/usr/local/bin/php';

do_cmd("$p /usr/local/bin/composer install --no-dev --optimize-autoloader");
do_cmd("$p artisan key:generate --force");
do_cmd("$p artisan migrate --force");
do_cmd("$p artisan storage:link");
do_cmd("$p artisan config:cache");

echo "\nDone.";
