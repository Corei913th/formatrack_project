# Formatrack API

API REST pour la gestion complète et optimisée des centres de formation professionnelle.

## 🚀 Présentation

Formatrack permet de centraliser et d'automatiser l'ensemble des processus administratifs, pédagogiques et financiers. 

### Principe Fondamental
Le système repose sur un suivi précis des heures de formation :
**Heures planifiées** → **Heures effectuées** → **Fin de formation** → **Admission** → **Génération de Certificat**.

## ✨ Fonctionnalités Principales

- **Gestion des Utilisateurs** : Authentification multi-rôles (Admin, Formateur, Étudiant).
- **Gestion des Étudiants** : Profils détaillés, suivi académique et financier.
- **Catalogue de Cours** : Gestion des formations, volumes horaires et tarifs.
- **Sessions de Formation** : Planification avec association de formateur et de salle.
- **Feuilles de Présence** : Pointage par QR Code dynamique ou manuel.
- **Paiements** : Suivi des transactions multi-modes (CASH, Bank, Mobile Money).
- **Certificats** : Génération automatique avec QR Code de vérification pour les admis.

## 🛠️ Stack Technique

- **Backend** : Laravel 11 (PHP 8.2+) / Node.js
- **Base de Données** : PostgreSQL
- **Architecture** : Helpers structurés pour la Response API et les opérations DB.

## 📦 Installation Locale

1. **Cloner le repository** :
   ```bash
   git clone [url-du-repo]
   cd formatrack_api
   ```

2. **Installer les dépendances** :
   ```bash
   composer install
   npm install
   ```

3. **Configurer l'environnement** :
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Migrations et Seeders** :
   ```bash
   php artisan migrate --seed
   ```

## 🌐 Déploiement

Le projet est configuré pour être déployé sur **O2Switch** (ou tout hébergement mutualisé supportant PHP 8.2+ et PostgreSQL). 
Consultez le guide détaillé : [docs/deployment_o2switch.md](docs/deployment_o2switch.md).

---
*Projet développé pour le cours Déploiement & Intégration Continus.*
