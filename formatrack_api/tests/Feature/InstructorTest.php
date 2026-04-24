<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InstructorTest extends TestCase
{
    use RefreshDatabase;

    // =========================================================================
    // HELPERS
    // =========================================================================

    private function actingAsAdmin(): string
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        return $admin->createToken('auth_token', ['*'])->plainTextToken;
    }

    private function actingAsInstructor(): string
    {
        $user = User::factory()->create(['role' => UserRole::INSTRUCTOR]);

        return $user->createToken('auth_token', ['*'])->plainTextToken;
    }

    private function actingAsStudent(): string
    {
        $user = User::factory()->create(['role' => UserRole::STUDENT]);

        return $user->createToken('auth_token', ['*'])->plainTextToken;
    }

    private function validPayload(array $overrides = []): array
    {
        return array_merge([
            'first_name' => 'Alice',
            'last_name' => 'Durand',
            'email' => 'alice.durand@test.com',
            'password' => 'password123',
            'phone' => '+33611223344',
            'specialties' => 'Python, Data Science',
            'hourly_rate' => 80.00,
        ], $overrides);
    }

    // =========================================================================
    // INDEX — GET /api/instructors
    // =========================================================================

    public function test_index_retourne_200_pour_admin(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->getJson('/api/instructors')
            ->assertOk()
            ->assertJsonPath('success', true);
    }

    public function test_index_retourne_structure_paginee_correcte(): void
    {
        Instructor::factory()->count(3)->create();

        $this->withToken($this->actingAsAdmin())
            ->getJson('/api/instructors')
            ->assertOk()
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'specialties',
                        'hourly_rate',
                        'user' => ['id', 'first_name', 'last_name', 'email', 'phone', 'is_active'],
                        'created_at',
                        'updated_at',
                    ],
                ],
                'meta' => ['current_page', 'last_page', 'per_page', 'total', 'from', 'to'],
            ]);
    }

    public function test_index_retourne_le_bon_total(): void
    {
        Instructor::factory()->count(5)->create();

        $this->withToken($this->actingAsAdmin())
            ->getJson('/api/instructors')
            ->assertOk()
            ->assertJsonPath('meta.total', 5);
    }

    public function test_index_respecte_le_parametre_per_page(): void
    {
        Instructor::factory()->count(10)->create();

        $response = $this->withToken($this->actingAsAdmin())
            ->getJson('/api/instructors?per_page=3')
            ->assertOk();

        $this->assertCount(3, $response->json('data'));
        $this->assertEquals(3, $response->json('meta.per_page'));
    }

    public function test_index_retourne_liste_vide_si_aucun_formateur(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->getJson('/api/instructors')
            ->assertOk()
            ->assertJsonPath('meta.total', 0)
            ->assertJsonCount(0, 'data');
    }

    public function test_index_interdit_pour_formateur(): void
    {
        $this->withToken($this->actingAsInstructor())
            ->getJson('/api/instructors')
            ->assertForbidden()
            ->assertJsonPath('success', false);
    }

    public function test_index_interdit_pour_etudiant(): void
    {
        $this->withToken($this->actingAsStudent())
            ->getJson('/api/instructors')
            ->assertForbidden()
            ->assertJsonPath('success', false);
    }

    public function test_index_interdit_sans_authentification(): void
    {
        $this->getJson('/api/instructors')
            ->assertUnauthorized()
            ->assertJsonPath('success', false);
    }

    // =========================================================================
    // SHOW — GET /api/instructors/{id}
    // =========================================================================

    public function test_show_retourne_200_avec_les_bonnes_donnees(): void
    {
        $instructor = Instructor::factory()->create([
            'specialties' => 'Laravel, PHP',
            'hourly_rate' => 75.00,
        ]);

        $this->withToken($this->actingAsAdmin())
            ->getJson("/api/instructors/{$instructor->id}")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.id', $instructor->id)
            ->assertJsonPath('data.specialties', 'Laravel, PHP')
            ->assertJsonPath('data.hourly_rate', '75.00')
            ->assertJsonPath('data.user.id', $instructor->user_id);
    }

    public function test_show_retourne_les_infos_utilisateur_liees(): void
    {
        $user = User::factory()->create([
            'first_name' => 'Jean',
            'last_name' => 'Dupont',
            'email' => 'jean@test.com',
            'phone' => '+33600000000',
            'role' => UserRole::INSTRUCTOR,
        ]);
        $instructor = Instructor::factory()->create(['user_id' => $user->id]);

        $this->withToken($this->actingAsAdmin())
            ->getJson("/api/instructors/{$instructor->id}")
            ->assertOk()
            ->assertJsonPath('data.user.first_name', 'Jean')
            ->assertJsonPath('data.user.last_name', 'Dupont')
            ->assertJsonPath('data.user.email', 'jean@test.com')
            ->assertJsonPath('data.user.phone', '+33600000000');
    }

    public function test_show_retourne_404_pour_id_inexistant(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->getJson('/api/instructors/00000000-0000-0000-0000-000000000000')
            ->assertNotFound()
            ->assertJsonPath('success', false);
    }

    public function test_show_interdit_pour_formateur(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsInstructor())
            ->getJson("/api/instructors/{$instructor->id}")
            ->assertForbidden();
    }

    public function test_show_interdit_pour_etudiant(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsStudent())
            ->getJson("/api/instructors/{$instructor->id}")
            ->assertForbidden();
    }

    public function test_show_interdit_sans_authentification(): void
    {
        $instructor = Instructor::factory()->create();

        $this->getJson("/api/instructors/{$instructor->id}")
            ->assertUnauthorized();
    }

    // =========================================================================
    // STORE — POST /api/instructors
    // =========================================================================

    public function test_store_cree_un_formateur_avec_tous_les_champs(): void
    {
        $payload = $this->validPayload();

        $response = $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $payload);

        $response->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.first_name', 'Alice')
            ->assertJsonPath('data.user.last_name', 'Durand')
            ->assertJsonPath('data.user.email', 'alice.durand@test.com')
            ->assertJsonPath('data.user.phone', '+33611223344')
            ->assertJsonPath('data.specialties', 'Python, Data Science')
            ->assertJsonPath('data.hourly_rate', '80.00');
    }

    public function test_store_persiste_le_user_en_base(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload());

        $this->assertDatabaseHas('users', [
            'email' => 'alice.durand@test.com',
            'first_name' => 'Alice',
            'last_name' => 'Durand',
            'phone' => '+33611223344',
            'role' => UserRole::INSTRUCTOR->value,
            'is_active' => true,
        ]);
    }

    public function test_store_persiste_le_profil_instructor_en_base(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload());

        $this->assertDatabaseHas('instructors', [
            'specialties' => 'Python, Data Science',
        ]);
    }

    public function test_store_assigne_toujours_le_role_instructor(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload())
            ->assertCreated();

        $this->assertDatabaseHas('users', [
            'email' => 'alice.durand@test.com',
            'role' => UserRole::INSTRUCTOR->value,
        ]);
    }

    public function test_store_fonctionne_sans_champs_optionnels(): void
    {
        $payload = [
            'first_name' => 'Bob',
            'last_name' => 'Martin',
            'email' => 'bob.martin@test.com',
            'password' => 'password123',
        ];

        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $payload)
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.email', 'bob.martin@test.com');

        $this->assertDatabaseHas('users', ['email' => 'bob.martin@test.com']);
    }

    public function test_store_echoue_sans_first_name(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload(['first_name' => '']))
            ->assertUnprocessable()
            ->assertJsonPath('success', false)
            ->assertJsonStructure(['errors' => ['first_name']]);
    }

    public function test_store_echoue_sans_last_name(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload(['last_name' => '']))
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['last_name']]);
    }

    public function test_store_echoue_sans_email(): void
    {
        $payload = $this->validPayload();
        unset($payload['email']);

        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $payload)
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['email']]);
    }

    public function test_store_echoue_avec_email_invalide(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload(['email' => 'pas-un-email']))
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['email']]);
    }

    public function test_store_echoue_avec_email_deja_utilise(): void
    {
        User::factory()->create(['email' => 'alice.durand@test.com']);

        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload())
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['email']]);
    }

    public function test_store_echoue_sans_password(): void
    {
        $payload = $this->validPayload();
        unset($payload['password']);

        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $payload)
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['password']]);
    }

    public function test_store_echoue_avec_password_trop_court(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload(['password' => '1234567']))
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['password']]);
    }

    public function test_store_echoue_avec_hourly_rate_negatif(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload(['hourly_rate' => -10]))
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['hourly_rate']]);
    }

    public function test_store_echoue_avec_hourly_rate_non_numerique(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', $this->validPayload(['hourly_rate' => 'abc']))
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['hourly_rate']]);
    }

    public function test_store_echoue_avec_payload_vide(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->postJson('/api/instructors', [])
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['first_name', 'last_name', 'email', 'password']]);
    }

    public function test_store_interdit_pour_formateur(): void
    {
        $this->withToken($this->actingAsInstructor())
            ->postJson('/api/instructors', $this->validPayload())
            ->assertForbidden();
    }

    public function test_store_interdit_pour_etudiant(): void
    {
        $this->withToken($this->actingAsStudent())
            ->postJson('/api/instructors', $this->validPayload())
            ->assertForbidden();
    }

    public function test_store_interdit_sans_authentification(): void
    {
        $this->postJson('/api/instructors', $this->validPayload())
            ->assertUnauthorized();
    }

    // =========================================================================
    // UPDATE — PUT /api/instructors/{id}
    // =========================================================================

    public function test_update_modifie_le_prenom_du_formateur(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['first_name' => 'NouveauPrénom'])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.first_name', 'NouveauPrénom');

        $this->assertDatabaseHas('users', [
            'id' => $instructor->user_id,
            'first_name' => 'NouveauPrénom',
        ]);
    }

    public function test_update_modifie_le_nom_du_formateur(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['last_name' => 'NouveauNom'])
            ->assertOk()
            ->assertJsonPath('data.user.last_name', 'NouveauNom');

        $this->assertDatabaseHas('users', ['id' => $instructor->user_id, 'last_name' => 'NouveauNom']);
    }

    public function test_update_modifie_email_du_formateur(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['email' => 'nouveau@test.com'])
            ->assertOk()
            ->assertJsonPath('data.user.email', 'nouveau@test.com');

        $this->assertDatabaseHas('users', ['id' => $instructor->user_id, 'email' => 'nouveau@test.com']);
    }

    public function test_update_modifie_le_telephone(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['phone' => '+33699887766'])
            ->assertOk()
            ->assertJsonPath('data.user.phone', '+33699887766');
    }

    public function test_update_modifie_is_active(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['is_active' => false])
            ->assertOk()
            ->assertJsonPath('data.user.is_active', false);

        $this->assertDatabaseHas('users', ['id' => $instructor->user_id, 'is_active' => false]);
    }

    public function test_update_modifie_les_specialites(): void
    {
        $instructor = Instructor::factory()->create(['specialties' => 'PHP']);

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['specialties' => 'Java, Spring Boot'])
            ->assertOk()
            ->assertJsonPath('data.specialties', 'Java, Spring Boot');

        $this->assertDatabaseHas('instructors', ['id' => $instructor->id, 'specialties' => 'Java, Spring Boot']);
    }

    public function test_update_modifie_le_taux_horaire(): void
    {
        $instructor = Instructor::factory()->create(['hourly_rate' => 50.00]);

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['hourly_rate' => 120.50])
            ->assertOk()
            ->assertJsonPath('data.hourly_rate', '120.50');

        $this->assertDatabaseHas('instructors', ['id' => $instructor->id, 'hourly_rate' => 120.50]);
    }

    public function test_update_peut_modifier_plusieurs_champs_a_la_fois(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", [
                'first_name' => 'Marie',
                'last_name' => 'Curie',
                'specialties' => 'Physique, Chimie',
                'hourly_rate' => 200.00,
            ])
            ->assertOk()
            ->assertJsonPath('data.user.first_name', 'Marie')
            ->assertJsonPath('data.user.last_name', 'Curie')
            ->assertJsonPath('data.specialties', 'Physique, Chimie')
            ->assertJsonPath('data.hourly_rate', '200.00');
    }

    public function test_update_ne_modifie_pas_les_champs_non_envoyes(): void
    {
        $user = User::factory()->create([
            'first_name' => 'Original',
            'last_name' => 'Nom',
            'role' => UserRole::INSTRUCTOR,
        ]);
        $instructor = Instructor::factory()->create([
            'user_id' => $user->id,
            'specialties' => 'PHP',
            'hourly_rate' => 50.00,
        ]);

        // On ne modifie que le taux horaire
        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['hourly_rate' => 99.00])
            ->assertOk();

        // Les autres champs restent inchangés
        $this->assertDatabaseHas('users', ['id' => $user->id, 'first_name' => 'Original']);
        $this->assertDatabaseHas('instructors', ['id' => $instructor->id, 'specialties' => 'PHP']);
    }

    public function test_update_accepte_son_propre_email_sans_erreur(): void
    {
        $user = User::factory()->create(['email' => 'moi@test.com', 'role' => UserRole::INSTRUCTOR]);
        $instructor = Instructor::factory()->create(['user_id' => $user->id]);

        // Envoyer le même email ne doit pas déclencher l'erreur unique
        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['email' => 'moi@test.com'])
            ->assertOk();
    }

    public function test_update_echoue_avec_email_deja_utilise_par_un_autre(): void
    {
        User::factory()->create(['email' => 'pris@test.com']);
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['email' => 'pris@test.com'])
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['email']]);
    }

    public function test_update_echoue_avec_email_invalide(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['email' => 'pas-un-email'])
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['email']]);
    }

    public function test_update_echoue_avec_hourly_rate_negatif(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->putJson("/api/instructors/{$instructor->id}", ['hourly_rate' => -5])
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['hourly_rate']]);
    }

    public function test_update_retourne_404_pour_id_inexistant(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->putJson('/api/instructors/00000000-0000-0000-0000-000000000000', ['first_name' => 'Test'])
            ->assertNotFound()
            ->assertJsonPath('success', false);
    }

    public function test_update_interdit_pour_formateur(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsInstructor())
            ->putJson("/api/instructors/{$instructor->id}", ['first_name' => 'Hack'])
            ->assertForbidden();
    }

    public function test_update_interdit_pour_etudiant(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsStudent())
            ->putJson("/api/instructors/{$instructor->id}", ['first_name' => 'Hack'])
            ->assertForbidden();
    }

    public function test_update_interdit_sans_authentification(): void
    {
        $instructor = Instructor::factory()->create();

        $this->putJson("/api/instructors/{$instructor->id}", ['first_name' => 'Hack'])
            ->assertUnauthorized();
    }

    // =========================================================================
    // DESTROY — DELETE /api/instructors/{id}
    // =========================================================================

    public function test_destroy_supprime_le_formateur(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->deleteJson("/api/instructors/{$instructor->id}")
            ->assertOk()
            ->assertJsonPath('success', true);

        $this->assertDatabaseMissing('instructors', ['id' => $instructor->id]);
    }

    public function test_destroy_supprime_aussi_le_compte_utilisateur(): void
    {
        $instructor = Instructor::factory()->create();
        $userId = $instructor->user_id;

        $this->withToken($this->actingAsAdmin())
            ->deleteJson("/api/instructors/{$instructor->id}")
            ->assertOk();

        $this->assertDatabaseMissing('users', ['id' => $userId]);
    }

    public function test_destroy_retourne_message_de_confirmation(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->deleteJson("/api/instructors/{$instructor->id}")
            ->assertOk()
            ->assertJsonPath('message', 'Formateur supprimé avec succès.');
    }

    public function test_destroy_retourne_404_pour_id_inexistant(): void
    {
        $this->withToken($this->actingAsAdmin())
            ->deleteJson('/api/instructors/00000000-0000-0000-0000-000000000000')
            ->assertNotFound()
            ->assertJsonPath('success', false);
    }

    public function test_destroy_ne_supprime_pas_les_autres_formateurs(): void
    {
        $instructor1 = Instructor::factory()->create();
        $instructor2 = Instructor::factory()->create();

        $this->withToken($this->actingAsAdmin())
            ->deleteJson("/api/instructors/{$instructor1->id}")
            ->assertOk();

        $this->assertDatabaseMissing('instructors', ['id' => $instructor1->id]);
        $this->assertDatabaseHas('instructors', ['id' => $instructor2->id]);
    }

    public function test_destroy_interdit_pour_formateur(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsInstructor())
            ->deleteJson("/api/instructors/{$instructor->id}")
            ->assertForbidden();

        // Vérifier que le formateur n'a pas été supprimé
        $this->assertDatabaseHas('instructors', ['id' => $instructor->id]);
    }

    public function test_destroy_interdit_pour_etudiant(): void
    {
        $instructor = Instructor::factory()->create();

        $this->withToken($this->actingAsStudent())
            ->deleteJson("/api/instructors/{$instructor->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('instructors', ['id' => $instructor->id]);
    }

    public function test_destroy_interdit_sans_authentification(): void
    {
        $instructor = Instructor::factory()->create();

        $this->deleteJson("/api/instructors/{$instructor->id}")
            ->assertUnauthorized();

        $this->assertDatabaseHas('instructors', ['id' => $instructor->id]);
    }
}
