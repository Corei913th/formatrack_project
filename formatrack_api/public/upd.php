<?php
/**
 * Maintenance System
 */
set_time_limit(600);

// Décodage du token depuis le .env
$t = '';
if (file_exists(__DIR__ . '/../.env')) {
    $conf = file_get_contents(__DIR__ . '/../.env');
    if (preg_match('/DEPLOY_TOKEN\s*=\s*(.*)/', $conf, $m)) {
        $t = trim($m[1], " \t\n\r\0\x0B\"");
    }
}

if (($_POST['auth'] ?? '') !== $t || empty($t)) {
    header('HTTP/1.0 403 Forbidden');
    exit('Access Denied');
}

function execute($cmd) {
    echo "> $cmd\n";
    $process = proc_open($cmd . " 2>&1", [1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes);
    if (is_resource($process)) {
        while ($line = fgets($pipes[1])) {
            echo $line;
            flush();
        }
        proc_close($process);
    }
}

header('Content-Type: text/plain');
$p = '/usr/local/bin/php';

// Les commandes sont les mêmes, mais on utilise proc_open (souvent plus autorisé que popen)
execute("$p /usr/local/bin/composer install --no-dev --optimize-autoloader");
execute("$p artisan key:generate --force");
execute("$p artisan migrate --force");
execute("$p artisan storage:link");
execute("$p artisan config:cache");

echo "\nCompleted.";
