<?php

namespace App\Helpers;

class DateHelper
{
    /**
     * Calculate age from birth date
     */
    public static function calculateAge(?string $birthDate): ?int
    {
        if (! $birthDate) {
            return null;
        }

        $birth = strtotime($birthDate);
        if ($birth === false) {
            return null;
        }

        $now = time();
        $age = date('Y', $now) - date('Y', $birth);

        // Adjust if birthday hasn't occurred this year
        if (date('md', $now) < date('md', $birth)) {
            $age--;
        }

        return $age;
    }

    /**
     * Check if date is in the past
     */
    public static function isPast(?string $date): bool
    {
        if (! $date) {
            return false;
        }

        return strtotime($date) < time();
    }

    /**
     * Check if date is in the future
     */
    public static function isFuture(?string $date): bool
    {
        if (! $date) {
            return false;
        }

        return strtotime($date) > time();
    }

    /**
     * Format date for display
     */
    public static function format(?string $date, string $format = 'd/m/Y'): ?string
    {
        if (! $date) {
            return null;
        }

        $timestamp = strtotime($date);

        return $timestamp !== false ? date($format, $timestamp) : null;
    }
}
