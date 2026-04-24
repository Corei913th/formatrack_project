<?php

namespace App\Enums;

enum Mention: string
{
    case PASSABLE = 'PASSABLE';
    case ASSEZ_BIEN = 'ASSEZ_BIEN';
    case BIEN = 'BIEN';
    case TRES_BIEN = 'TRES_BIEN';
    case EXCELLENT = 'EXCELLENT';
}
