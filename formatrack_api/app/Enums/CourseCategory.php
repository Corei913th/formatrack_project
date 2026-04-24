<?php

namespace App\Enums;

enum CourseCategory: string
{
    case INFORMATIQUE = 'INFORMATIQUE';
    case LANGUES = 'LANGUES';
    case MANAGEMENT = 'MANAGEMENT';
    case COMPTABILITE = 'COMPTABILITE';
    case MARKETING = 'MARKETING';
    case DESIGN = 'DESIGN';
    case DEVELOPPEMENT_PERSONNEL = 'DEVELOPPEMENT_PERSONNEL';
    case AUTRE = 'AUTRE';
}
