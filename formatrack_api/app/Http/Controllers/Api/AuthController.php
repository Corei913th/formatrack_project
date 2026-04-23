<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    #[OA\Post(
        path: '/api/auth/login',
        tags: ['Authentification'],
        summary: 'Se connecter',
        description: "Authentifie l'utilisateur et retourne les tokens d'accès et de rafraîchissement.",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'test@example.com'),
                    new OA\Property(property: 'password', type: 'string', format: 'password', example: 'password'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Connexion réussie'),
            new OA\Response(response: 422, description: 'Erreur de validation'),
            new OA\Response(response: 500, description: 'Erreur serveur'),
        ]
    )]
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        return api_success($result, 'Connexion réussie.');
    }

    #[OA\Post(
        path: '/api/auth/logout',
        tags: ['Authentification'],
        summary: 'Se déconnecter',
        description: "Révoque le token d'accès actuel.",
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'Déconnexion réussie'),
            new OA\Response(response: 401, description: 'Non authentifié'),
        ]
    )]
    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return api_success(null, 'Déconnexion réussie.');
    }

    #[OA\Post(
        path: '/api/auth/refresh',
        tags: ['Authentification'],
        summary: 'Rafraîchir les tokens',
        description: "Révoque tous les tokens actuels et en génère de nouveaux. Nécessite un token avec l'habileté 'refresh'.",
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'Tokens rafraîchis'),
            new OA\Response(response: 401, description: 'Non authentifié ou token invalide'),
        ]
    )]
    public function refresh(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user->tokenCan('refresh')) {
            return api_error('Ce token n\'est pas autorisé à rafraîchir les accès.', null, 401);
        }

        $result = $this->authService->refresh($user);

        return api_success($result, 'Tokens rafraîchis avec succès.');
    }

    #[OA\Get(
        path: '/api/auth/me',
        tags: ['Authentification'],
        summary: 'Profil de l\'utilisateur connecté',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'Profil retourné'),
            new OA\Response(response: 401, description: 'Non authentifié'),
        ]
    )]
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return api_success([
            'id'         => $user->id,
            'first_name' => $user->first_name,
            'last_name'  => $user->last_name,
            'email'      => $user->email,
            'phone'      => $user->phone,
            'role'       => $user->role->value,
            'is_active'  => $user->is_active,
        ], 'Profil récupéré.');
    }
}


// Permettre à l'administrateur de consulter la liste des formateurs (instructeurs), d'en ajouter un nouveau, de modifier les informations d'un formateur existant et de supprimer un formateur.
