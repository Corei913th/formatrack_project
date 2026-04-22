<?php

namespace App\Enums;

enum FormStatus: string
{
    case DRAFT = 'DRAFT';
    case SUBMITTED = 'SUBMITTED';
    case VALIDATED = 'VALIDATED';
    case REJECTED = 'REJECTED';
    case CANCELLED = 'CANCELLED';
}
