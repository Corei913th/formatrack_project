<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Course;
use App\Models\Instructor;
use App\Models\Room;
use App\Models\TrainingSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TrainingSession>
 */
class TrainingSessionFactory extends Factory
{
    protected $model = TrainingSession::class;

    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('+1 week', '+3 months');
        $endDate = (clone $startDate)->modify('+'.$this->faker->numberBetween(1, 14).' days');

        return [
            'course_id' => Course::factory(),
            'instructor_id' => Instructor::factory(),
            'room_id' => Room::factory(),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'planned_hours' => $this->faker->numberBetween(20, 200),
            'completed_hours' => 0,
            'qr_code_token' => null,
            'qr_code_expires_at' => null,
        ];
    }
}
