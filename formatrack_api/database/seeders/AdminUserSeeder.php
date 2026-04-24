<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Créer un utilisateur admin pour les tests
        User::updateOrCreate(
            ['email' => 'admin@formatrack.com'],
            [
                'first_name' => 'prince',
                'last_name' => 'hybrel',
                'email' => 'hybreltapdur7@gmail.com',
                'password' => Hash::make('admin123456'),
                'role' => UserRole::ADMIN,
                'email_verified_at' => now(),
                'is_active' => true,
            ]
        );

    }
}
