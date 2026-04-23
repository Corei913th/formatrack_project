<?php

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Maintenance / Update Script for o2switch
// Usage: POST /upd.php with token and commands

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);
$request = Request::capture();

$token = $request->input('token');
$expectedToken = env('DEPLOY_TOKEN');

if (! $token || $token !== $expectedToken) {
    header('HTTP/1.1 403 Forbidden');
    exit('Unauthorized');
}

$commands = $request->input('commands');
if ($commands) {
    $decodedCommands = json_decode(base64_decode($commands), true);

    foreach ($decodedCommands as $command) {
        try {
            echo "Executing: $command\n";
            $kernel->call($command);
            echo $kernel->output()."\n";
        } catch (Exception $e) {
            echo 'Error: '.$e->getMessage()."\n";
        }
    }
}

echo "Maintenance finished.\n";
