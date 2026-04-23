<?php

namespace App\Services;

use App\Enums\UserRole;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class InstructorService
{
    /**
     * Paginated list of instructors with their user info.
     */
    public function list(int $perPage = 15): LengthAwarePaginator
    {
        return Instructor::with('user')
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Find a single instructor or throw ModelNotFoundException.
     */
    public function findOrFail(string $id): Instructor
    {
        return Instructor::with('user')->findOrFail($id);
    }

    /**
     * Create a User (INSTRUCTOR role) + linked Instructor profile in a transaction.
     */
    public function create(array $data): Instructor
    {
        return runTransaction(function () use ($data) {
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name'  => $data['last_name'],
                'email'      => $data['email'],
                'password'   => Hash::make($data['password']),
                'phone'      => $data['phone'] ?? null,
                'role'       => UserRole::INSTRUCTOR,
                'is_active'  => true,
            ]);

            $instructor = Instructor::create([
                'user_id'     => $user->id,
                'specialties' => $data['specialties'] ?? null,
                'hourly_rate' => $data['hourly_rate'] ?? null,
            ]);

            $instructor->setRelation('user', $user);

            return $instructor->fresh('user');
        }, 'InstructorService::create');
    }

    /**
     * Update user info and instructor profile in a transaction.
     */
    public function update(Instructor $instructor, array $data): Instructor
    {
        return runTransaction(function () use ($instructor, $data) {
            $userFields = array_filter([
                'first_name' => $data['first_name'] ?? null,
                'last_name'  => $data['last_name'] ?? null,
                'email'      => $data['email'] ?? null,
                'phone'      => array_key_exists('phone', $data) ? $data['phone'] : null,
                'is_active'  => $data['is_active'] ?? null,
            ], fn ($v) => $v !== null);

            // Handle explicit null for phone
            if (array_key_exists('phone', $data)) {
                $userFields['phone'] = $data['phone'];
            }

            if (! empty($userFields)) {
                $instructor->user->update($userFields);
            }

            $instructorFields = [];
            if (array_key_exists('specialties', $data)) {
                $instructorFields['specialties'] = $data['specialties'];
            }
            if (array_key_exists('hourly_rate', $data)) {
                $instructorFields['hourly_rate'] = $data['hourly_rate'];
            }

            if (! empty($instructorFields)) {
                $instructor->update($instructorFields);
            }

            return $instructor->fresh('user');
        }, 'InstructorService::update');
    }

    /**
     * Delete instructor and associated user account.
     */
    public function delete(Instructor $instructor): void
    {
        runTransaction(function () use ($instructor) {
            $user = $instructor->user;
            $instructor->delete();
            $user->delete();
        }, 'InstructorService::delete');
    }
}
