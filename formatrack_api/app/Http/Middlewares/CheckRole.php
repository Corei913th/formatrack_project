<?php

namespace App\Http\Middlewares;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(Request): (Response)  $next
     */
    public function handle(Request $request, \Closure $next, string ...$roles): Response
    {
        if (!$request->user()) {
            return api_error('Non authentifié', 'UNAUTHENTICATED', 401);
        }

        /** @var User $user */
        $user = $request->user();

        $hasRole = !empty(array_intersect($roles, [$user->role->value]));

        if (!$hasRole) {
            return api_error(
                'Accès refusé. Rôle requis: '.implode(' ou ', $roles),
                'FORBIDDEN',
                403
            );
        }

        return $next($request);
    }
}
