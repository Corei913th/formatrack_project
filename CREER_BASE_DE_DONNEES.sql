-- ============================================================================
-- GESTION DES SALLES - Création de la base de données
-- ============================================================================

-- 1. Créer la base de données
CREATE DATABASE IF NOT EXISTS gestion_salles 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 2. Utiliser la base de données
USE gestion_salles;

-- 3. Vérifier que la base est créée
SELECT DATABASE();

-- ============================================================================
-- INSTRUCTIONS:
-- ============================================================================
-- 
-- Option 1: Via MySQL Command Line
-- ---------------------------------
-- 1. Ouvrez MySQL Command Line Client
-- 2. Entrez votre mot de passe root
-- 3. Copiez-collez les commandes ci-dessus
-- 
-- Option 2: Via phpMyAdmin
-- ------------------------
-- 1. Ouvrez phpMyAdmin dans votre navigateur
-- 2. Cliquez sur "Nouvelle base de données"
-- 3. Nom: gestion_salles
-- 4. Interclassement: utf8mb4_unicode_ci
-- 5. Cliquez sur "Créer"
-- 
-- Option 3: Via MySQL Workbench
-- -----------------------------
-- 1. Ouvrez MySQL Workbench
-- 2. Connectez-vous à votre serveur
-- 3. Cliquez sur l'icône "Create a new schema"
-- 4. Nom: gestion_salles
-- 5. Charset: utf8mb4
-- 6. Collation: utf8mb4_unicode_ci
-- 7. Cliquez sur "Apply"
-- 
-- ============================================================================
-- APRÈS AVOIR CRÉÉ LA BASE:
-- ============================================================================
-- 
-- Retournez dans votre terminal et lancez:
-- php artisan migrate
-- 
-- Cela créera automatiquement la table 'salles' avec tous les champs.
-- 
-- ============================================================================
