# FormaTrack - Frontend

Application web moderne pour la gestion académique, les concours et le suivi des épreuves. Construit avec une architecture modulaire et une interface utilisateur premium.

## 🚀 Stack Technique

- **Framework** : [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [TailwindCSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Gestion d'état** : [React Query](https://tanstack.com/query/latest) (TanStack Query)
- **Formulaires** : [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)

## 🛠️ Installation

1. **Cloner le dépôt**
   ```bash
   git clone <repository-url>
   cd formatrack_frontend
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Configuration de l'environnement**
   Copiez le fichier `.env.example` vers `.env` et ajustez l'URL de l'API :
   ```bash
   cp .env.example .env
   ```
   Exemple de contenu :
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Lancer le serveur de développement**
   ```bash
   pnpm dev
   ```

## 📂 Structure du projet

- `src/modules` : Logique métier groupée par domaine (Auth, Users, Concours, etc.).
- `src/components` : Composants UI réutilisables (Atoms, Molecules, Layouts).
- `src/hooks` : Hooks React personnalisés (Génériques et thématiques).
- `src/contexts` : Contextes globaux (Auth, Theme).
- `src/routes` : Configuration du routage et gardes de sécurité.

## 🔑 Synchronisation des Rôles

Le système utilise une énumération unifiée `UserRole` alignée sur le backend :
- `ADMIN` : Accès complet au système.
- `INSTRUCTOR` : Gestion des épreuves et des notes.
- `STUDENT` : Consultation des résultats et inscriptions.

Développé par l'équipe FormaTrack.
