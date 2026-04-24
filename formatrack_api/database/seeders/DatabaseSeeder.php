<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Compte principal demandé ──────────────────────────────────────────
        User::factory()->create([
            'first_name' => 'Naelle',
            'last_name'  => 'Admin',
            'email'      => 'naelle@formatrack.com',
            'password'   => Hash::make('noutong'),
            'role'       => UserRole::ADMIN,
            'is_active'  => true,
        ]);

        // ── Autres admins ─────────────────────────────────────────────────────
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name'  => 'Formatrack',
            'email'      => 'admin@formatrack.com',
            'password'   => Hash::make('password'),
            'role'       => UserRole::ADMIN,
            'is_active'  => true,
        ]);

        // ── Formateurs ────────────────────────────────────────────────────────
        $instructorUser1 = User::factory()->create([
            'first_name' => 'Jean',
            'last_name'  => 'Dupont',
            'email'      => 'jean.dupont@formatrack.com',
            'password'   => Hash::make('password'),
            'role'       => UserRole::INSTRUCTOR,
            'phone'      => '+33612345678',
            'is_active'  => true,
        ]);

        Instructor::create([
            'user_id'     => $instructorUser1->id,
            'specialties' => 'Développement Web, PHP, Laravel',
            'hourly_rate' => 75.00,
        ]);

        $instructorUser2 = User::factory()->create([
            'first_name' => 'Marie',
            'last_name'  => 'Martin',
            'email'      => 'marie.martin@formatrack.com',
            'password'   => Hash::make('password'),
            'role'       => UserRole::INSTRUCTOR,
            'phone'      => '+33698765432',
            'is_active'  => true,
        ]);

        Instructor::create([
            'user_id'     => $instructorUser2->id,
            'specialties' => 'Management, Leadership, Communication',
            'hourly_rate' => 90.00,
        ]);

        $instructorUser3 = User::factory()->create([
            'first_name' => 'Paul',
            'last_name'  => 'Bernard',
            'email'      => 'paul.bernard@formatrack.com',
            'password'   => Hash::make('password'),
            'role'       => UserRole::INSTRUCTOR,
            'phone'      => '+33677889900',
            'is_active'  => false,
        ]);

        Instructor::create([
            'user_id'     => $instructorUser3->id,
            'specialties' => 'JavaScript, React, Node.js',
            'hourly_rate' => 85.00,
        ]);

        // ── Étudiant ──────────────────────────────────────────────────────────
        User::factory()->create([
            'first_name' => 'Pierre',
            'last_name'  => 'Étudiant',
            'email'      => 'etudiant@formatrack.com',
            'password'   => Hash::make('password'),
            'role'       => UserRole::STUDENT,
            'is_active'  => true,
        ]);

        $this->call([
            UserSeeder::class,
        ]);

        $this->command->info('Utilisateurs de test créés :');

        $this->command->table(
            ['Rôle', 'Email', 'Mot de passe'],
            [
                ['ADMIN', 'naelle@formatrack.com', 'noutong  ← compte principal'],
                ['ADMIN', 'admin@formatrack.com', 'password'],
                ['INSTRUCTOR', 'jean.dupont@formatrack.com', 'password'],
                ['INSTRUCTOR', 'marie.martin@formatrack.com', 'password'],
                ['INSTRUCTOR', 'paul.bernard@formatrack.com', 'password (inactif)'],
                ['STUDENT', 'etudiant@formatrack.com', 'password'],
            ]
        );
    }
}
