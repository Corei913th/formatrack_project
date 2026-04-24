<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Enums\CourseCategory;
use App\Enums\UserRole;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CourseControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private User $adminUser;

    private User $regularUser;

    protected function setUp(): void
    {
        parent::setUp();

        // Créer un utilisateur admin
        $this->adminUser = User::factory()->create([
            'role' => UserRole::ADMIN,
        ]);

        // Créer un utilisateur normal
        $this->regularUser = User::factory()->create([
            'role' => UserRole::STUDENT,
        ]);
    }

    /** @test */
    public function it_can_list_courses_for_authenticated_admin()
    {
        Sanctum::actingAs($this->adminUser);

        // Créer quelques cours
        Course::factory()->count(3)->create();

        $response = $this->getJson('/api/courses');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'current_page',
                    'data' => [
                        '*' => [
                            'id',
                            'code',
                            'title',
                            'description',
                            'category',
                            'total_hours',
                            'max_students',
                            'price',
                            'created_at',
                            'updated_at',
                        ],
                    ],
                    'total',
                    'per_page',
                ],
            ])
            ->assertJson([
                'success' => true,
                'message' => 'Liste des cours récupérée avec succès',
            ]);
    }

    /** @test */
    public function it_can_search_courses_by_title()
    {
        Sanctum::actingAs($this->adminUser);

        Course::factory()->create(['title' => 'Formation Laravel']);
        Course::factory()->create(['title' => 'Formation PHP']);
        Course::factory()->create(['title' => 'Formation JavaScript']);

        $response = $this->getJson('/api/courses?search=Laravel');

        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('data.total'));
        $this->assertStringContainsString('Laravel', $response->json('data.data.0.title'));
    }

    /** @test */
    public function it_can_filter_courses_by_category()
    {
        Sanctum::actingAs($this->adminUser);

        Course::factory()->create(['category' => CourseCategory::INFORMATIQUE]);
        Course::factory()->create(['category' => CourseCategory::LANGUES]);

        $response = $this->getJson('/api/courses?category=INFORMATIQUE');

        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('data.total'));
        $this->assertEquals('INFORMATIQUE', $response->json('data.data.0.category'));
    }

    /** @test */
    public function it_denies_access_to_non_admin_users()
    {
        Sanctum::actingAs($this->regularUser);

        $response = $this->getJson('/api/courses');

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'Accès refusé. Rôle requis: admin',
            ]);
    }

    /** @test */
    public function it_requires_authentication_to_access_courses()
    {
        $response = $this->getJson('/api/courses');

        $response->assertStatus(401);
    }

    /** @test */
    public function it_can_create_a_course_with_valid_data()
    {
        Sanctum::actingAs($this->adminUser);

        $courseData = [
            'code' => 'FORM001',
            'title' => 'Formation Laravel Avancée',
            'description' => 'Formation complète sur Laravel',
            'photo_url' => 'https://example.com/photo.jpg',
            'category' => CourseCategory::INFORMATIQUE->value,
            'total_hours' => 40,
            'max_students' => 20,
            'price' => 500.00,
            'prerequisites' => 'Connaissances PHP',
            'objectives' => 'Maîtriser Laravel',
        ];

        $response = $this->postJson('/api/courses', $courseData);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Cours créé avec succès',
            ])
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'code',
                    'title',
                    'description',
                    'category',
                    'total_hours',
                    'max_students',
                    'price',
                ],
            ]);

        $this->assertDatabaseHas('courses', [
            'code' => 'FORM001',
            'title' => 'Formation Laravel Avancée',
        ]);
    }

    /** @test */
    public function it_validates_required_fields_when_creating_course()
    {
        Sanctum::actingAs($this->adminUser);

        $response = $this->postJson('/api/courses', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'code',
                'title',
                'category',
                'total_hours',
                'max_students',
                'price',
            ]);
    }

    /** @test */
    public function it_validates_unique_course_code()
    {
        Sanctum::actingAs($this->adminUser);

        Course::factory()->create(['code' => 'FORM001']);

        $courseData = [
            'code' => 'FORM001',
            'title' => 'Nouveau cours',
            'category' => CourseCategory::INFORMATIQUE->value,
            'total_hours' => 30,
            'max_students' => 15,
            'price' => 300.00,
        ];

        $response = $this->postJson('/api/courses', $courseData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['code']);
    }

    /** @test */
    public function it_validates_course_code_format()
    {
        Sanctum::actingAs($this->adminUser);

        $courseData = [
            'code' => 'invalid code!',
            'title' => 'Test Course',
            'category' => CourseCategory::INFORMATIQUE->value,
            'total_hours' => 30,
            'max_students' => 15,
            'price' => 300.00,
        ];

        $response = $this->postJson('/api/courses', $courseData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['code']);
    }

    /** @test */
    public function it_validates_category_enum()
    {
        Sanctum::actingAs($this->adminUser);

        $courseData = [
            'code' => 'FORM001',
            'title' => 'Test Course',
            'category' => 'INVALID_CATEGORY',
            'total_hours' => 30,
            'max_students' => 15,
            'price' => 300.00,
        ];

        $response = $this->postJson('/api/courses', $courseData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['category']);
    }

    /** @test */
    public function it_validates_numeric_fields_ranges()
    {
        Sanctum::actingAs($this->adminUser);

        $courseData = [
            'code' => 'FORM001',
            'title' => 'Test Course',
            'category' => CourseCategory::INFORMATIQUE->value,
            'total_hours' => 0, // Invalid: minimum 1
            'max_students' => 0, // Invalid: minimum 1
            'price' => -100, // Invalid: minimum 0
        ];

        $response = $this->postJson('/api/courses', $courseData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['total_hours', 'max_students', 'price']);
    }

    /** @test */
    public function it_can_show_a_specific_course()
    {
        Sanctum::actingAs($this->adminUser);

        $course = Course::factory()->create();

        $response = $this->getJson("/api/courses/{$course->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Détails du cours récupérés avec succès',
                'data' => [
                    'id' => $course->id,
                    'code' => $course->code,
                    'title' => $course->title,
                ],
            ]);
    }

    /** @test */
    public function it_returns_404_for_non_existent_course()
    {
        Sanctum::actingAs($this->adminUser);

        $response = $this->getJson('/api/courses/non-existent-id');

        $response->assertStatus(404);
    }

    /** @test */
    public function it_can_update_a_course()
    {
        Sanctum::actingAs($this->adminUser);

        $course = Course::factory()->create([
            'title' => 'Ancien titre',
            'price' => 300.00,
        ]);

        $updateData = [
            'title' => 'Nouveau titre',
            'price' => 400.00,
        ];

        $response = $this->putJson("/api/courses/{$course->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Cours modifié avec succès',
                'data' => [
                    'title' => 'Nouveau titre',
                    'price' => '400.00',
                ],
            ]);

        $this->assertDatabaseHas('courses', [
            'id' => $course->id,
            'title' => 'Nouveau titre',
            'price' => 400.00,
        ]);
    }

    /** @test */
    public function it_validates_unique_code_when_updating_course()
    {
        Sanctum::actingAs($this->adminUser);

        $course1 = Course::factory()->create(['code' => 'FORM001']);
        $course2 = Course::factory()->create(['code' => 'FORM002']);

        $response = $this->putJson("/api/courses/{$course2->id}", [
            'code' => 'FORM001', // Trying to use existing code
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['code']);
    }

    /** @test */
    public function it_allows_keeping_same_code_when_updating_course()
    {
        Sanctum::actingAs($this->adminUser);

        $course = Course::factory()->create(['code' => 'FORM001']);

        $response = $this->putJson("/api/courses/{$course->id}", [
            'code' => 'FORM001', // Same code should be allowed
            'title' => 'Updated title',
        ]);

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_delete_a_course_without_training_sessions()
    {
        Sanctum::actingAs($this->adminUser);

        $course = Course::factory()->create();

        $response = $this->deleteJson("/api/courses/{$course->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Cours supprimé avec succès',
            ]);

        $this->assertDatabaseMissing('courses', ['id' => $course->id]);
    }

    /** @test */
    public function it_cannot_delete_course_with_training_sessions()
    {
        Sanctum::actingAs($this->adminUser);

        $course = Course::factory()->create();

        // Créer une session de formation associée
        $course->trainingSessions()->create([
            'instructor_id' => Instructor::factory()->create()->id,
            'room_id' => Room::factory()->create()->id,
            'start_date' => now()->addDays(7),
            'end_date' => now()->addDays(14),
            'planned_hours' => 40,
            'completed_hours' => 0,
        ]);

        $response = $this->deleteJson("/api/courses/{$course->id}");

        $response->assertStatus(409)
            ->assertJson([
                'success' => false,
                'message' => 'Impossible de supprimer ce cours car il a des sessions de formation associées',
            ]);

        $this->assertDatabaseHas('courses', ['id' => $course->id]);
    }

    /** @test */
    public function it_paginates_courses_correctly()
    {
        Sanctum::actingAs($this->adminUser);

        Course::factory()->count(25)->create();

        $response = $this->getJson('/api/courses?per_page=10&page=2');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'current_page' => 2,
                    'per_page' => 10,
                    'total' => 25,
                ],
            ]);

        $this->assertCount(10, $response->json('data.data'));
    }

    /** @test */
    public function it_limits_per_page_to_maximum_100()
    {
        Sanctum::actingAs($this->adminUser);

        Course::factory()->count(150)->create();

        $response = $this->getJson('/api/courses?per_page=200');

        $response->assertStatus(200);
        $this->assertEquals(100, $response->json('data.per_page'));
    }
}
