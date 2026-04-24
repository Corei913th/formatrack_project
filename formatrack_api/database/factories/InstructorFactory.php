<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Instructor>
 */
class InstructorFactory extends Factory
{
    protected $model = Instructor::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory()->create(['role' => UserRole::INSTRUCTOR]),
            'specialties' => $this->faker->words(3, true),
            'hourly_rate' => $this->faker->randomFloat(2, 20, 100),
        ];
    }
}