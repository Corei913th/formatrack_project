<?php

namespace App\Enums;

enum RoomType: string
{
    case COURS = 'COURS';
    case INFORMATIQUE = 'INFORMATIQUE';
    case LABORATOIRE = 'LABORATOIRE';
    case CONFERENCE = 'CONFERENCE';
    case AUTRE = 'AUTRE';
}
