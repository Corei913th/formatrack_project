<?php

namespace App\Enums;

enum RegistrationStep: string
{
    case ELIGIBILITY = 'eligibility_check';
    case PAYMENT_UPLOAD = 'payment_upload';
    case MANUAL_ENTRY = 'manual_entry';
    case ACCOUNT_CREATION = 'account_creation';
}
