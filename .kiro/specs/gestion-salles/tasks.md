# Implementation Plan: Gestion des Salles

## Overview

Implémentation incrémentale du module de gestion des salles : migration de base de données, API Laravel, tests PBT, puis interface React.

## Tasks

- [x] 1. Créer la migration et le modèle Salle
  - Créer le fichier de migration avec tous les champs définis dans le design
  - Définir le modèle Eloquent `Salle` avec `$fillable`
  - Lancer `php artisan migrate`
  - _Requirements: 5.1, 5.2_

- [x] 2. Implémenter SalleController — méthode `index`
  - [x] 2.1 Implémenter `index()` retournant uniquement les salles actives
    - `Salle::where('active', true)->get()`
    - Enregistrer la route GET `/api/salles`
    - _Requirements: 1.1, 1.2_

  - [ ] 2.2 Écrire le test PBT pour Property 1 (filtre actives + round-trip désactivation)

    - **Property 1 : Filtre des salles actives (round-trip désactivation)**
    - **Validates: Requirements 1.2, 4.3**

- [x] 3. Implémenter SalleController — méthode `store`
  - [x] 3.1 Implémenter `store()` avec validation et création
    - Valider `code` (required, unique), `nom` (required), `capacite` (required, integer, min:1)
    - Retourner la salle créée avec HTTP 201
    - Enregistrer la route POST `/api/salles`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 3.2 Écrire le test PBT pour Property 2 (création persistée)
    - **Property 2 : Création persistée**
    - **Validates: Requirements 2.1**

  - [ ]* 3.3 Écrire le test PBT pour Property 3 (rejet codes invalides)
    - **Property 3 : Rejet des codes invalides à la création**
    - **Validates: Requirements 2.2**

  - [ ]* 3.4 Écrire le test PBT pour Property 4 (rejet capacités invalides)
    - **Property 4 : Rejet des capacités invalides**
    - **Validates: Requirements 2.4**

- [x] 4. Implémenter SalleController — méthode `update`
  - [x] 4.1 Implémenter `update()` avec validation et mise à jour
    - Retourner 404 si la salle n'existe pas
    - Valider `code` (required, unique sauf soi-même), `nom` (required)
    - Enregistrer la route PUT `/api/salles/{id}`
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ]* 4.2 Écrire le test PBT pour Property 5 (mise à jour persistée)
    - **Property 5 : Mise à jour persistée**
    - **Validates: Requirements 3.1**

  - [ ]* 4.3 Écrire le test PBT pour Property 6 (unicité du code à la modification)
    - **Property 6 : Unicité du code à la modification**
    - **Validates: Requirements 3.3**

- [x] 5. Implémenter SalleController — méthode `destroy`
  - [x] 5.1 Implémenter `destroy()` avec soft-delete
    - Passer `active = false`, retourner message de confirmation
    - Retourner 404 si la salle n'existe pas
    - Enregistrer la route DELETE `/api/salles/{id}`
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 5.2 Écrire le test PBT pour Property 7 (désactivation soft-delete)
    - **Property 7 : Désactivation soft-delete**
    - **Validates: Requirements 4.1**

- [ ] 6. Checkpoint — Vérifier que tous les tests backend passent
  - S'assurer que tous les tests passent, demander à l'utilisateur si des questions se posent.

- [x] 7. Créer l'interface React — liste des salles
  - [x] 7.1 Créer le hook `useSalles` appelant GET `/api/salles`
    - Gérer l'état de chargement et les erreurs
    - _Requirements: 6.1_

  - [x] 7.2 Créer le composant `SalleList` affichant le tableau
    - Colonnes : code, nom, type, capacité, bâtiment, bouton Désactiver
    - _Requirements: 1.3, 6.1_

  - [ ]* 7.3 Écrire les tests unitaires pour `SalleList`
    - Vérifier que le tableau s'affiche avec les bonnes colonnes
    - _Requirements: 1.3_

- [x] 8. Créer l'interface React — formulaire de création
  - [x] 8.1 Créer le composant `SalleForm` avec tous les champs
    - Soumettre via POST `/api/salles` et rafraîchir la liste
    - _Requirements: 2.5, 6.2_

  - [x] 8.2 Afficher les messages d'erreur de validation retournés par l'API
    - _Requirements: 6.3_

  - [ ]* 8.3 Écrire les tests unitaires pour `SalleForm`
    - Tester la soumission valide et l'affichage des erreurs
    - _Requirements: 6.2, 6.3_

- [x] 9. Connecter le bouton Désactiver dans `SalleList`
  - Envoyer DELETE `/api/salles/{id}` et retirer la salle de la liste affichée
  - _Requirements: 6.4_

  - [ ]* 9.1 Écrire le test unitaire pour la désactivation depuis l'UI
    - _Requirements: 6.4_

- [ ] 10. Checkpoint final — Vérifier que tous les tests passent
  - S'assurer que tous les tests passent, demander à l'utilisateur si des questions se posent.

## Notes

- Les tâches marquées `*` sont optionnelles et peuvent être ignorées pour un MVP rapide
- Chaque tâche référence les requirements pour la traçabilité
- Les tests PBT utilisent Pest avec `RefreshDatabase` (backend) et Vitest (frontend)
- Les checkpoints garantissent une validation incrémentale
