<?php

namespace App\Helpers;

use App\Constants\RegistrationConstants;

class CodeGeneratorHelper
{
    /**
     * Générer un code temporaire unique
     */
    public static function generateTempCode(
        string $prefix = RegistrationConstants::TEMP_CODE_PREFIX,
        int $length = RegistrationConstants::TEMP_CODE_LENGTH
    ): string {
        return $prefix.strtoupper(substr(md5(uniqid().time()), 0, $length));
    }

    /**
     * Générer un code de vérification (6 chiffres par défaut)
     */
    public static function generateVerificationCode(int $length = 6): string
    {
        return str_pad((string) random_int(0, pow(10, $length) - 1), $length, '0', STR_PAD_LEFT);
    }

    /**
     * Générer un code candidat unique basé sur l'ID utilisateur
     */
    public static function generateCandidatCode(string $utilisateurId): string
    {
        return self::generateTempCode().'-'.substr($utilisateurId, 0, 4);
    }
}
