<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Instructor>
 */
class InstructorFactory extends Factory
{
    protected $model = Instructor::class;

    public function definition(): array
    {
        return [
            'user_id'     => User::factory()->state(['role' => UserRole::INSTRUCTOR]),
            'specialties' => fake()->randomElement([
                'PHP, Laravel, MySQL',
                'JavaScript, React, Node.js',
                'Management, Leadership',
                'Comptabilité, Finance',
                'Marketing Digital, SEO',
            ]),
            'hourly_rate' => fake()->randomFloat(2, 30, 150),
        ];
    }
}
