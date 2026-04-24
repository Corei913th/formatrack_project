# Requirements Document

## Introduction

Ce module gère les salles d'un établissement (école, université, bâtiment). Il expose une API REST Laravel permettant de créer, consulter, modifier et désactiver des salles. Une interface React permet aux utilisateurs de gérer les salles via un navigateur. Ce module est conçu pour s'intégrer dans un système plus large.

## Glossaire

- **Salle**: Espace physique identifié par un code unique, appartenant à un bâtiment, avec une capacité et des équipements.
- **API**: Interface REST exposée par Laravel pour la gestion des salles.
- **SalleController**: Contrôleur Laravel gérant les opérations CRUD sur les salles.
- **Validator**: Composant Laravel validant les données entrantes avant persistance.
- **Client React**: Interface web consommant l'API pour afficher et gérer les salles.

---

## Requirements

### Requirement 1 : Consultation des salles

**User Story:** En tant qu'utilisateur, je veux consulter la liste des salles, afin de connaître les espaces disponibles dans l'établissement.

#### Acceptance Criteria

1. WHEN une requête GET est envoyée à `/api/salles`, THE API SHALL retourner la liste de toutes les salles avec leurs attributs (code, nom, type, capacité, équipements, bâtiment, étage, active).
2. WHEN la liste est retournée, THE API SHALL inclure uniquement les salles dont le champ `active` est `true`.
3. THE Client React SHALL afficher la liste des salles dans un tableau avec les colonnes : code, nom, type, capacité, bâtiment.

### Requirement 2 : Création d'une salle

**User Story:** En tant qu'administrateur, je veux ajouter une nouvelle salle, afin d'enrichir le référentiel des espaces disponibles.

#### Acceptance Criteria

1. WHEN une requête POST est envoyée à `/api/salles` avec un corps JSON valide, THE SalleController SHALL créer une nouvelle salle et retourner l'objet créé avec un code HTTP 201.
2. WHEN le champ `code` est absent ou déjà utilisé, THE Validator SHALL rejeter la requête et retourner une erreur de validation avec un code HTTP 422.
3. WHEN le champ `nom` est absent, THE Validator SHALL rejeter la requête et retourner une erreur de validation avec un code HTTP 422.
4. WHEN le champ `capacite` est absent, nul ou inférieur à 1, THE Validator SHALL rejeter la requête et retourner une erreur de validation avec un code HTTP 422.
5. THE Client React SHALL fournir un formulaire permettant de saisir tous les champs d'une salle et de soumettre la création.

### Requirement 3 : Modification d'une salle

**User Story:** En tant qu'administrateur, je veux modifier les informations d'une salle existante, afin de maintenir le référentiel à jour.

#### Acceptance Criteria

1. WHEN une requête PUT est envoyée à `/api/salles/{id}` avec un corps JSON valide, THE SalleController SHALL mettre à jour la salle correspondante et retourner l'objet mis à jour.
2. WHEN l'identifiant `{id}` ne correspond à aucune salle, THE SalleController SHALL retourner une erreur avec un code HTTP 404.
3. WHEN le champ `code` est modifié avec une valeur déjà utilisée par une autre salle, THE Validator SHALL rejeter la requête et retourner une erreur de validation avec un code HTTP 422.
4. WHEN le champ `nom` est absent dans la requête de modification, THE Validator SHALL rejeter la requête et retourner une erreur de validation avec un code HTTP 422.

### Requirement 4 : Désactivation d'une salle

**User Story:** En tant qu'administrateur, je veux désactiver une salle sans la supprimer, afin de conserver l'historique tout en la retirant de la liste active.

#### Acceptance Criteria

1. WHEN une requête DELETE est envoyée à `/api/salles/{id}`, THE SalleController SHALL passer le champ `active` de la salle à `false` et retourner un message de confirmation.
2. WHEN l'identifiant `{id}` ne correspond à aucune salle, THE SalleController SHALL retourner une erreur avec un code HTTP 404.
3. WHEN une salle est désactivée, THE API SHALL exclure cette salle des résultats retournés par l'endpoint GET `/api/salles`.

### Requirement 5 : Validation et intégrité des données

**User Story:** En tant que développeur, je veux que les données des salles soient validées avant persistance, afin de garantir l'intégrité du référentiel.

#### Acceptance Criteria

1. THE Validator SHALL s'assurer que le champ `code` est unique parmi toutes les salles de la base de données.
2. THE Validator SHALL s'assurer que le champ `capacite` est un entier strictement positif.
3. IF une requête contient des champs inconnus, THEN THE SalleController SHALL les ignorer sans retourner d'erreur.

### Requirement 6 : Interface React

**User Story:** En tant qu'utilisateur, je veux une interface web simple pour gérer les salles, afin de ne pas avoir à utiliser Postman ou des outils techniques.

#### Acceptance Criteria

1. WHEN l'interface React est chargée, THE Client React SHALL afficher la liste des salles récupérée depuis l'API.
2. WHEN un utilisateur soumet le formulaire d'ajout avec des données valides, THE Client React SHALL envoyer une requête POST à l'API et rafraîchir la liste affichée.
3. WHEN l'API retourne une erreur de validation, THE Client React SHALL afficher un message d'erreur lisible à l'utilisateur.
4. WHEN un utilisateur clique sur "Désactiver" pour une salle, THE Client React SHALL envoyer une requête DELETE à l'API et retirer la salle de la liste affichée.
