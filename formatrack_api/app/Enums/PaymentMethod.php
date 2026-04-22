<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case CASH = 'CASH';
    case BANK_TRANSFER = 'BANK_TRANSFER';
    case CREDIT_CARD = 'CREDIT_CARD';
    case CHECK = 'CHECK';
    case MOBILE_MONEY = 'MOBILE_MONEY';
}
