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
        // Admin
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name'  => 'Formatrack',
            'email'      => 'admin@formatrack.com',
            'password'   => Hash::make('password'),
            'role'       => UserRole::ADMIN,
            'is_active'  => true,
        ]);

        // Formateur 1
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

        // Formateur 2
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

        // Étudiant
        User::factory()->create([
            'first_name' => 'Pierre',
            'last_name'  => 'Étudiant',
            'email'      => 'etudiant@formatrack.com',
            'password'   => Hash::make('password'),
            'role'       => UserRole::STUDENT,
            'is_active'  => true,
        ]);

        $this->command->info('Utilisateurs de test créés :');
        $this->command->table(
            ['Rôle', 'Email', 'Mot de passe'],
            [
                ['ADMIN',      'admin@formatrack.com',           'password'],
                ['INSTRUCTOR', 'jean.dupont@formatrack.com',     'password'],
                ['INSTRUCTOR', 'marie.martin@formatrack.com',    'password'],
                ['STUDENT',    'etudiant@formatrack.com',        'password'],
            ]
        );
    }
}
