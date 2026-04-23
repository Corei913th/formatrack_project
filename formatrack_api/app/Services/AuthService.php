<?php

namespace App\Services;

use App\Constants\TokenConstants;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * Service d' authentification
 */
class AuthService
{
    public function __construct(
        private readonly User $userModel
    ) {}

    /**
     * Generate access and refresh tokens.
     */
    public function generateTokens(User $user): array
    {
        // Access Token
        $accessToken = $user->createToken(
            TokenConstants::DEFAULT_ACCESS_TOKEN_NAME,
            [TokenConstants::ABILITY_ALL],
            now()->addMinutes(TokenConstants::DEFAULT_ACCESS_TOKEN_EXPIRY_MINUTES)
        );

        // Refresh Token
        $refreshToken = $user->createToken(
            TokenConstants::DEFAULT_REFRESH_TOKEN_NAME,
            [TokenConstants::ABILITY_REFRESH],
            now()->addDays(TokenConstants::DEFAULT_REFRESH_TOKEN_EXPIRY_DAYS)
        );

        return [
            'access_token' => $accessToken->plainTextToken,
            'refresh_token' => $refreshToken->plainTextToken,
            'token_type' => TokenConstants::TOKEN_TYPE,
            'expires_in' => TokenConstants::DEFAULT_ACCESS_TOKEN_EXPIRY_MINUTES * 60,
        ];
    }

    public function login(array $credentials): array
    {
        $user = $this->verifyUserCredentials($credentials['email'], $credentials['password']);

        return $this->generateTokens($user);
    }

    /**
     * Vérifier les credentials d'un User
     *
     * @param  string  $email  Email de l' user
     * @param  string  $password  Mot de passe
     *
     * @throws ValidationException
     */
    public function verifyUserCredentials(string $email, string $password): User
    {
        $user = $this->userModel->where('email', $email)->first();

        if (! $user || ! Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants fournis sont incorrects.'],
            ]);
        }

        return $user;
    }

    /**
     * Refresh tokens using a refresh token.
     */
    public function refresh(User $user): array
    {
        // Revoke all existing tokens to ensure a clean state
        $user->tokens()->delete();

        return $this->generateTokens($user);
    }

    /**
     * Logout user by revoking current token.
     */
    public function logout(User $user): void
    {
        $user->currentAccessToken()->delete();
    }
}
