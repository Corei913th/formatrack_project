<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;

class ValidationHelper
{
    /**
     * Valider un fichier uploadé
     */
    public static function validateFile(
        UploadedFile $file,
        array $allowedMimes,
        int $maxSize
    ): array {
        $errors = [];

        if (! in_array(strtolower($file->getClientOriginalExtension()), $allowedMimes)) {
            $errors[] = 'Type de fichier non autorisé. Formats acceptés: '.implode(', ', array_map('strtoupper', $allowedMimes));
        }

        if ($file->getSize() > $maxSize) {
            $sizeMB = $maxSize / (1024 * 1024);
            $errors[] = "Le fichier est trop volumineux. Taille maximale: {$sizeMB}MB";
        }

        return $errors;
    }

    /**
     * Valider un montant
     */
    public static function validateAmount(float $actual, float $expected, float $tolerance = 0.01): bool
    {
        return abs($actual - $expected) <= $tolerance;
    }

    /**
     * Formater les erreurs de validation
     */
    public static function formatErrors(array $errors): array
    {
        $formatted = [];
        foreach ($errors as $field => $messages) {
            $formatted[$field] = is_array($messages) ? $messages : [$messages];
        }

        return $formatted;
    }
}
