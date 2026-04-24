# Gestion des Salles

Module complet de gestion des salles avec API Laravel et interface React.

## 🚀 Démarrage rapide

### Prérequis
- PHP 8.1+
- MySQL
- Composer
- Node.js & npm

### Installation

1. **Installer les dépendances PHP** (en cours) :
   ```bash
   composer install
   ```

2. **Installer les dépendances JavaScript** (déjà fait) :
   ```bash
   npm install
   ```

3. **Configurer l'environnement** :
   - Le fichier `.env` est déjà créé
   - Modifiez les paramètres de base de données si nécessaire

4. **Générer la clé d'application** :
   ```bash
   php artisan key:generate
   ```

5. **Créer la base de données** :
   ```sql
   CREATE DATABASE gestion_salles;
   ```

6. **Lancer les migrations** :
   ```bash
   php artisan migrate
   ```

7. **Démarrer les serveurs** :
   
   Terminal 1 - Laravel :
   ```bash
   php artisan serve
   ```
   
   Terminal 2 - Vite (déjà démarré) :
   ```bash
   npm run dev
   ```

8. **Accéder à l'application** :
   ```
   http://localhost:8000
   ```

## 📋 Fonctionnalités

### API REST
- ✅ Lister les salles actives
- ✅ Créer une nouvelle salle
- ✅ Modifier une salle existante
- ✅ Désactiver une salle (soft delete)
- ✅ Validation des données
- ✅ Gestion des erreurs

### Interface utilisateur
- ✅ Tableau des salles avec colonnes : code, nom, type, capacité, bâtiment
- ✅ Formulaire de création avec validation
- ✅ Bouton de désactivation
- ✅ Affichage des erreurs de validation
- ✅ Rechargement automatique après création

## 🗂️ Structure de la base de données

### Table `salles`
| Colonne      | Type    | Description                    |
|--------------|---------|--------------------------------|
| id           | bigint  | Identifiant unique             |
| code         | varchar | Code unique de la salle        |
| nom          | varchar | Nom de la salle                |
| type         | varchar | Type de salle                  |
| capacite     | integer | Capacité (min: 1)              |
| equipements  | varchar | Équipements disponibles        |
| batiment     | varchar | Bâtiment                       |
| etage        | integer | Étage                          |
| active       | boolean | Statut (true/false)            |
| created_at   | timestamp | Date de création             |
| updated_at   | timestamp | Date de modification         |

## 🔌 API Endpoints

| Méthode | Route              | Description                |
|---------|--------------------|----------------------------|
| GET     | /api/salles        | Liste des salles actives   |
| POST    | /api/salles        | Créer une salle            |
| PUT     | /api/salles/{id}   | Modifier une salle         |
| DELETE  | /api/salles/{id}   | Désactiver une salle       |

### Exemples de requêtes

**Créer une salle** :
```json
POST /api/salles
{
  "code": "A101",
  "nom": "Salle de cours A101",
  "type": "Cours",
  "capacite": 30,
  "batiment": "Bâtiment A",
  "etage": 1
}
```

**Modifier une salle** :
```json
PUT /api/salles/1
{
  "code": "A101",
  "nom": "Salle de cours A101 - Rénovée",
  "capacite": 35
}
```

## 📁 Architecture du code

```
app/
├── Http/Controllers/
│   └── SalleController.php     # Contrôleur CRUD
└── Models/
    └── Salle.php               # Modèle Eloquent

resources/
├── js/
│   ├── components/
│   │   ├── SallesApp.jsx       # Composant principal
│   │   ├── SalleList.jsx       # Liste des salles
│   │   └── SalleForm.jsx       # Formulaire de création
│   ├── hooks/
│   │   └── useSalles.js        # Hook pour API calls
│   └── app.jsx                 # Point d'entrée React
└── views/
    └── salles.blade.php        # Vue Blade

routes/
├── api.php                     # Routes API
└── web.php                     # Routes web
```

## 🧪 Tests

Les tests property-based (PBT) sont définis dans le document de design mais marqués comme optionnels pour le MVP.

## 📝 Documentation complète

Consultez les documents dans `.kiro/specs/gestion-salles/` :
- `requirements.md` - Spécifications détaillées
- `design.md` - Architecture et design
- `tasks.md` - Plan d'implémentation

## ✅ Statut du projet

Toutes les fonctionnalités principales sont implémentées et prêtes à l'emploi !

- ✅ Migration et modèle
- ✅ API REST complète
- ✅ Interface React
- ✅ Validation des données
- ✅ Gestion des erreurs
- ✅ Configuration Vite

## 🤝 Contribution

Ce module a été développé selon la méthodologie Spec-Driven Development avec des requirements EARS et des propriétés de correction formelles.
