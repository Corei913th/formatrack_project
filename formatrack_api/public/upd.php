<?php

/**
 * Maintenance System (Pure PHP Version)
 */
set_time_limit(600);

$t = '';
if (file_exists(__DIR__.'/../.env')) {
    $c = file_get_contents(__DIR__.'/../.env');
    if (preg_match('/DEPLOY_TOKEN\s*=\s*(.*)/', $c, $m)) {
        $t = trim($m[1], " \t\n\r\0\x0B\"");
    }
}

if (($_POST['auth'] ?? '') !== $t || empty($t)) {
    header('HTTP/1.0 403 Forbidden');
    exit('Access Denied');
}

header('Content-Type: text/plain');
echo "--- Starting Maintenance (Pure PHP) ---\n";

try {
    // On charge Laravel normalement puisque le vendor sera présent
    require __DIR__.'/../vendor/autoload.php';
    $app = require_once __DIR__.'/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $console = new Symfony\Component\Console\Output\BufferedOutput();

    $commands = [
        'migrate' => ['--force' => true],
        'storage:link' => [],
        'config:cache' => [],
        'route:cache' => [],
    ];

    foreach ($commands as $cmd => $args) {
        echo "Running: artisan $cmd...\n";
        $kernel->call($cmd, $args, $console);
        echo $console->fetch()."\n";
    }

    echo "\nAll tasks completed successfully.";
} catch (Exception $e) {
    echo "Fatal Error: ".$e->getMessage();
}
