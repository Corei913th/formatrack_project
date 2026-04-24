<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Course\StoreCourseRequest;
use App\Http\Requests\Course\UpdateCourseRequest;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Courses",
 *     description="Gestion des cours"
 * )
 */
class CourseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/courses",
     *     summary="Liste des cours",
     *     description="Récupère la liste paginée de tous les cours",
     *     tags={"Courses"},
     *     security={{"sanctum": {}}},
     *
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Numéro de page",
     *         required=false,
     *
     *         @OA\Schema(type="integer", minimum=1, default=1)
     *     ),
     *
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Nombre d'éléments par page",
     *         required=false,
     *
     *         @OA\Schema(type="integer", minimum=1, maximum=100, default=15)
     *     ),
     *
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Recherche par titre ou code",
     *         required=false,
     *
     *         @OA\Schema(type="string")
     *     ),
     *
     *     @OA\Parameter(
     *         name="category",
     *         in="query",
     *         description="Filtrer par catégorie",
     *         required=false,
     *
     *         @OA\Schema(type="string")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Liste des cours récupérée avec succès",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Liste des cours récupérée avec succès"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="current_page", type="integer"),
     *                 @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Course")),
     *                 @OA\Property(property="total", type="integer"),
     *                 @OA\Property(property="per_page", type="integer"),
     *                 @OA\Property(property="last_page", type="integer")
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Non authentifié"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $query = Course::query();

        // Recherche par titre ou code
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('code', 'LIKE', "%{$search}%");
            });
        }

        // Filtrage par catégorie
        if ($request->filled('category')) {
            $query->where('category', $request->get('category'));
        }

        // Tri par date de création (plus récent en premier)
        $query->orderBy('created_at', 'desc');

        // Pagination
        $perPage = min($request->get('per_page', 15), 100);
        $courses = $query->paginate($perPage);

        return ResponseHelper::success(
            $courses,
            'Liste des cours récupérée avec succès'
        );
    }

    /**
     * @OA\Post(
     *     path="/api/courses",
     *     summary="Créer un nouveau cours",
     *     description="Crée un nouveau cours dans le système",
     *     tags={"Courses"},
     *     security={{"sanctum": {}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(ref="#/components/schemas/StoreCourseRequest")
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Cours créé avec succès",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Cours créé avec succès"),
     *             @OA\Property(property="data", ref="#/components/schemas/Course")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Erreur de validation"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Non authentifié"
     *     )
     * )
     */
    public function store(StoreCourseRequest $request): JsonResponse
    {
        $course = Course::create($request->validated());

        return ResponseHelper::success(
            $course,
            'Cours créé avec succès',
            201
        );
    }

    /**
     * @OA\Get(
     *     path="/api/courses/{id}",
     *     summary="Détails d'un cours",
     *     description="Récupère les détails d'un cours spécifique",
     *     tags={"Courses"},
     *     security={{"sanctum": {}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID du cours",
     *         required=true,
     *
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Détails du cours récupérés avec succès",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Détails du cours récupérés avec succès"),
     *             @OA\Property(property="data", ref="#/components/schemas/Course")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Cours non trouvé"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Non authentifié"
     *     )
     * )
     */
    public function show(Course $course): JsonResponse
    {
        return ResponseHelper::success(
            $course,
            'Détails du cours récupérés avec succès'
        );
    }

    /**
     * @OA\Put(
     *     path="/api/courses/{id}",
     *     summary="Modifier un cours",
     *     description="Met à jour les informations d'un cours existant",
     *     tags={"Courses"},
     *     security={{"sanctum": {}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID du cours",
     *         required=true,
     *
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(ref="#/components/schemas/UpdateCourseRequest")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Cours modifié avec succès",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Cours modifié avec succès"),
     *             @OA\Property(property="data", ref="#/components/schemas/Course")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Erreur de validation"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Cours non trouvé"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Non authentifié"
     *     )
     * )
     */
    public function update(UpdateCourseRequest $request, Course $course): JsonResponse
    {
        $course->update($request->validated());

        return ResponseHelper::success(
            $course->fresh(),
            'Cours modifié avec succès'
        );
    }

    /**
     * @OA\Delete(
     *     path="/api/courses/{id}",
     *     summary="Supprimer un cours",
     *     description="Supprime un cours du système",
     *     tags={"Courses"},
     *     security={{"sanctum": {}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID du cours",
     *         required=true,
     *
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Cours supprimé avec succès",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Cours supprimé avec succès")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Cours non trouvé"
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="Impossible de supprimer le cours (sessions de formation associées)"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Non authentifié"
     *     )
     * )
     */
    public function destroy(Course $course): JsonResponse
    {
        // Vérifier s'il y a des sessions de formation associées
        if ($course->trainingSessions()->exists()) {
            return ResponseHelper::error(
                'Impossible de supprimer ce cours car il a des sessions de formation associées',
                null,
                409
            );
        }

        $course->delete();

        return ResponseHelper::success(
            null,
            'Cours supprimé avec succès'
        );
    }
}
