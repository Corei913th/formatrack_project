<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Création de l'Administrateur principal
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'Formatrack',
            'email' => 'admin@formatrack.com',
            'password' => Hash::make('password'),
            'role' => UserRole::ADMIN,
            'is_active' => true,
        ]);

        // 2. Création de quelques Instructeurs avec leurs profils
        User::factory()->count(5)->create([
            'role' => UserRole::INSTRUCTOR,
            'password' => Hash::make('password'),
        ])->each(function ($user) {
            $user->instructor()->create([
                'specialties' => fake()->randomElement(['PHP, Laravel', 'React, Next.js', 'DevOps, Docker', 'UI/UX Design', 'Python, Data Science']),
                'hourly_rate' => fake()->randomFloat(2, 25, 80),
            ]);
        });

        // 3. Création de quelques Étudiants avec leurs profils
        User::factory()->count(15)->create([
            'role' => UserRole::STUDENT,
            'password' => Hash::make('password'),
        ])->each(function ($user) {
            $user->student()->create([
                'student_number' => 'STU-'.strtoupper(bin2hex(random_bytes(4))),
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'is_active' => true,
            ]);
        });

        // 4. Création d'un utilisateur inactif pour les tests
        User::factory()->create([
            'first_name' => 'Inactive',
            'last_name' => 'User',
            'email' => 'inactive@formatrack.com',
            'is_active' => false,
            'role' => UserRole::STUDENT,
        ]);
    }
}
