# Guide d'Installation - Gestion des Salles

## Étapes pour finaliser l'installation

### 1. Attendre la fin de `composer install`
L'installation de Composer est en cours. Attendez qu'elle se termine complètement.

### 2. Générer la clé d'application
```bash
php artisan key:generate
```

### 3. Configurer la base de données
Ouvrez le fichier `.env` et configurez vos paramètres MySQL :
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gestion_salles
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
```

### 4. Créer la base de données
Créez une base de données MySQL nommée `gestion_salles` :
```sql
CREATE DATABASE gestion_salles CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Lancer les migrations
```bash
php artisan migrate
```

### 6. Démarrer le serveur Laravel
Dans un terminal :
```bash
php artisan serve
```

### 7. Démarrer Vite (déjà en cours)
Le serveur Vite est déjà démarré sur http://localhost:5173/

### 8. Accéder à l'application
Ouvrez votre navigateur et allez sur :
```
http://localhost:8000
```

## Fonctionnalités disponibles

✅ **API REST complète** :
- GET `/api/salles` - Liste des salles actives
- POST `/api/salles` - Créer une salle
- PUT `/api/salles/{id}` - Modifier une salle
- DELETE `/api/salles/{id}` - Désactiver une salle

✅ **Interface React** :
- Liste des salles avec tableau
- Formulaire de création
- Bouton de désactivation
- Gestion des erreurs de validation

## Résolution de problèmes

### Si composer install échoue
Relancez simplement :
```bash
composer install
```

### Si les migrations échouent
Vérifiez que :
1. MySQL est démarré
2. La base de données existe
3. Les identifiants dans `.env` sont corrects

### Si Vite ne fonctionne pas
Redémarrez-le :
```bash
npm run dev
```

## Structure du projet

```
├── app/
│   ├── Http/Controllers/
│   │   └── SalleController.php    # Contrôleur API
│   └── Models/
│       └── Salle.php               # Modèle Eloquent
├── database/migrations/
│   └── 2024_01_01_000000_create_salles_table.php
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── SallesApp.jsx      # Composant principal
│   │   │   ├── SalleList.jsx      # Liste des salles
│   │   │   └── SalleForm.jsx      # Formulaire
│   │   └── hooks/
│   │       └── useSalles.js       # Hook personnalisé
│   └── views/
│       └── salles.blade.php       # Vue principale
└── routes/
    ├── api.php                     # Routes API
    └── web.php                     # Routes web
```

## Votre module est prêt ! 🎉
