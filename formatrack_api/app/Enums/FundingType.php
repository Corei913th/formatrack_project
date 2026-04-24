<?php

namespace App\Enums;

enum FundingType: string
{
    case PERSONAL = 'PERSONAL';
    case CPF = 'CPF';
    case EMPLOYER = 'EMPLOYER';
    case OPCO = 'OPCO';
    case POLE_EMPLOI = 'POLE_EMPLOI';
    case AUTRE = 'AUTRE';
}
