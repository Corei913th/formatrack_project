<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    title: 'API FORMATRACK',
    description: "Documentation de l' api FORMATRACK",
    contact: new OA\Contact(email: 'support@formatrack.com'),
    license: new OA\License(name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html')
)]
#[OA\Server(url: 'https://formatrack.cdwfs.net', description: 'Serveur Local')]
#[OA\SecurityScheme(
    securityScheme: 'bearerAuth',
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
)]
abstract class Controller
{
    //
}