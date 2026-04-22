<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Spatie\LaravelPdf\Facades\Pdf;

class PdfServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Configure Chrome path globally for all PDF generation
        if ($chromePath = env('BROWSERSHOT_CHROME_PATH')) {
            Pdf::default()->withBrowsershot(function ($browsershot) use ($chromePath) {
                $browsershot->setChromePath($chromePath)
                    ->noSandbox()
                    ->addCustomFlags(['--disable-setuid-sandbox']);
            });
        }
    }
}
