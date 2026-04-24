<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\RoomType;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Room>
 */
class RoomFactory extends Factory
{
    protected $model = Room::class;

    public function definition(): array
    {
        return [
            'code' => strtoupper($this->faker->unique()->bothify('ROOM###')),
            'name' => 'Salle '.$this->faker->bothify('##?'),
            'type' => $this->faker->randomElement(RoomType::cases()),
            'capacity' => $this->faker->numberBetween(10, 100),
            'equipments' => $this->faker->optional()->words(3, true),
            'building' => $this->faker->optional()->word(),
            'floor' => $this->faker->optional()->numberBetween(0, 5),
            'is_active' => true,
        ];
    }
}
