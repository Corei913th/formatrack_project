<?php

namespace Database\Factories;

use App\Enums\CourseCategory;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Course>
 */
class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition(): array
    {
        return [
            'code' => strtoupper($this->faker->unique()->bothify('FORM###')),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'photo_url' => $this->faker->optional()->imageUrl(640, 480, 'education'),
            'category' => $this->faker->randomElement(CourseCategory::cases()),
            'total_hours' => $this->faker->numberBetween(10, 200),
            'max_students' => $this->faker->numberBetween(5, 50),
            'price' => $this->faker->randomFloat(2, 100, 2000),
            'prerequisites' => $this->faker->optional()->sentence(),
            'objectives' => $this->faker->optional()->paragraph(),
        ];
    }

    /**
     * Course informatique
     */
    public function informatique(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => CourseCategory::INFORMATIQUE,
        ]);
    }

    /**
     * Course avec prix élevé
     */
    public function expensive(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => $this->faker->randomFloat(2, 1000, 5000),
        ]);
    }

    /**
     * Course avec beaucoup d'heures
     */
    public function intensive(): static
    {
        return $this->state(fn (array $attributes) => [
            'total_hours' => $this->faker->numberBetween(100, 300),
        ]);
    }
}
