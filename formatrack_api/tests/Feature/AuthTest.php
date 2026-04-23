<?php

namespace Tests\Feature;

use App\Constants\TokenConstants;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test login returns tokens.
     */
    public function test_utilisateur_can_login(): void
    {
        $user = User::factory()->create([
            'email' => 'login@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'access_token',
                    'refresh_token',
                    'token_type',
                    'expires_in'
                ],
            ]);
    }

    /**
     * Test login fails with wrong credentials.
     */
    public function test_login_fails_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'login@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'login@example.com',
            'password' => 'wrong_password',
        ]);

        $response->assertStatus(422);
    }

    /**
     * Test logout revokes token.
     */
    public function test_utilisateur_can_logout(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $connectUser = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/auth/logout');

        $connectUser->assertStatus(200);
        $this->assertCount(0, $user->fresh()->tokens);
    }

    /**
     * Test token refresh.
     */
    public function test_utilisateur_can_refresh_token(): void
    {
        $user = User::factory()->create();
        // Create a refresh token
        $refreshToken = $user->createToken('refresh', [TokenConstants::ABILITY_REFRESH])->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$refreshToken)
            ->postJson('/api/auth/refresh');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'access_token',
                    'refresh_token',
                ],
            ]);

        // After refresh, old tokens are deleted and 2 new ones are created
        $this->assertCount(2, $user->fresh()->tokens);
    }

    /**
     * Test refresh fails with access token.
     */
    public function test_refresh_fails_with_access_token(): void
    {
        $user = User::factory()->create();
        // We Use a specific ability that is NOT 'refresh' and NOT '*'
        $accessToken = $user->createToken('access', ['access-data'])->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$accessToken)
            ->postJson('/api/auth/refresh');

        $response->assertStatus(401);
        $response->assertJsonPath('message', 'Ce token n\'est pas autorisé à rafraîchir les accès.');
    }
}
