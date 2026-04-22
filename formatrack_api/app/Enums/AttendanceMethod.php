<?php

namespace App\Enums;

enum AttendanceMethod: string
{
    case MANUAL = 'MANUAL';
    case QR_CODE = 'QR_CODE';
}
