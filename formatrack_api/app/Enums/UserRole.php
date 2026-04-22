<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'ADMIN';
    case INSTRUCTOR = 'INSTRUCTOR';
    case STUDENT = 'STUDENT';
}
