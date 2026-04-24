<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Instructor\StoreInstructorRequest;
use App\Http\Requests\Instructor\UpdateInstructorRequest;
use App\Http\Resources\InstructorResource;
use App\Services\InstructorService;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Formateurs', description: 'Gestion des formateurs (ADMIN uniquement)')]
class InstructorController extends Controller
{
    public function __construct(
        private readonly InstructorService $instructorService
    ) {}

    #[OA\Get(
        path: '/api/instructors',
        tags: ['Formateurs'],
        summary: 'Liste des formateurs',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(name: 'per_page', in: 'query', required: false, schema: new OA\Schema(type: 'integer', default: 15)),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Liste paginée des formateurs'),
            new OA\Response(response: 403, description: 'Accès refusé'),
        ]
    )]
    public function index(): JsonResponse
    {
        $perPage = (int) request('per_page', 15);
        $instructors = $this->instructorService->list($perPage);

        return api_paginated($instructors, 'Liste des formateurs.', InstructorResource::class);
    }

    #[OA\Post(
        path: '/api/instructors',
        tags: ['Formateurs'],
        summary: 'Créer un formateur',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 201, description: 'Formateur créé'),
            new OA\Response(response: 422, description: 'Erreur de validation'),
            new OA\Response(response: 403, description: 'Accès refusé'),
        ]
    )]
    public function store(StoreInstructorRequest $request): JsonResponse
    {
        $instructor = $this->instructorService->create($request->validated());

        return api_created(new InstructorResource($instructor), 'Formateur créé avec succès.');
    }

    #[OA\Get(
        path: '/api/instructors/{id}',
        tags: ['Formateurs'],
        summary: 'Détail d\'un formateur',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'string', format: 'uuid')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Formateur trouvé'),
            new OA\Response(response: 404, description: 'Formateur introuvable'),
        ]
    )]
    public function show(string $id): JsonResponse
    {
        $instructor = $this->instructorService->findOrFail($id);

        return api_success(new InstructorResource($instructor), 'Formateur récupéré avec succès.');
    }

    #[OA\Put(
        path: '/api/instructors/{id}',
        tags: ['Formateurs'],
        summary: 'Modifier un formateur',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'string', format: 'uuid')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Formateur mis à jour'),
            new OA\Response(response: 404, description: 'Formateur introuvable'),
            new OA\Response(response: 422, description: 'Erreur de validation'),
        ]
    )]
    public function update(UpdateInstructorRequest $request, string $id): JsonResponse
    {
        $instructor = $this->instructorService->findOrFail($id);
        $instructor = $this->instructorService->update($instructor, $request->validated());

        return api_updated(new InstructorResource($instructor), 'Formateur mis à jour avec succès.');
    }

    #[OA\Delete(
        path: '/api/instructors/{id}',
        tags: ['Formateurs'],
        summary: 'Supprimer un formateur',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'string', format: 'uuid')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Formateur supprimé'),
            new OA\Response(response: 404, description: 'Formateur introuvable'),
        ]
    )]
    public function destroy(string $id): JsonResponse
    {
        $instructor = $this->instructorService->findOrFail($id);
        $this->instructorService->delete($instructor);

        return api_deleted('Formateur supprimé avec succès.');
    }
}
