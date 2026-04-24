@echo off
echo ========================================
echo   Gestion des Salles - Demarrage
echo ========================================
echo.

echo [1/5] Verification de composer install...
if not exist "vendor\" (
    echo Composer install en cours...
    call composer install
)

echo.
echo [2/5] Generation de la cle d'application...
php artisan key:generate

echo.
echo [3/5] Lancement des migrations...
php artisan migrate

echo.
echo [4/5] Demarrage du serveur Laravel...
start cmd /k "php artisan serve"

echo.
echo [5/5] Vite est deja demarre sur http://localhost:5173/
echo.
echo ========================================
echo   Application prete !
echo   Ouvrez: http://localhost:8000
echo ========================================
pause
