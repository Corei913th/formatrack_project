<?php

namespace Database\Seeders;

use App\Models\Salle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $salles = [
            [
                'code' => 'A101',
                'nom' => 'Salle de Cours A101',
                'type' => 'Cours',
                'capacite' => 50,
                'equipements' => 'Projecteur, Tableau blanc, WiFi',
                'batiment' => 'Bâtiment A',
                'etage' => 1,
                'active' => true,
            ],
            [
                'code' => 'A102',
                'nom' => 'Salle de Cours A102',
                'type' => 'Cours',
                'capacite' => 45,
                'equipements' => 'Projecteur, Tableau blanc, WiFi',
                'batiment' => 'Bâtiment A',
                'etage' => 1,
                'active' => true,
            ],
            [
                'code' => 'A201',
                'nom' => 'Salle de Réunion A201',
                'type' => 'Réunion',
                'capacite' => 20,
                'equipements' => 'Table de conférence, Vidéoconférence',
                'batiment' => 'Bâtiment A',
                'etage' => 2,
                'active' => true,
            ],
            [
                'code' => 'B101',
                'nom' => 'Amphithéâtre B101',
                'type' => 'Amphithéâtre',
                'capacite' => 200,
                'equipements' => 'Projecteurs multiples, Système audio, Estrade',
                'batiment' => 'Bâtiment B',
                'etage' => 1,
                'active' => true,
            ],
            [
                'code' => 'B102',
                'nom' => 'Laboratoire Informatique B102',
                'type' => 'Laboratoire',
                'capacite' => 30,
                'equipements' => '30 Ordinateurs, Vidéoprojecteur, Imprimante',
                'batiment' => 'Bâtiment B',
                'etage' => 1,
                'active' => true,
            ],
            [
                'code' => 'B201',
                'nom' => 'Salle de Travail B201',
                'type' => 'Travail',
                'capacite' => 15,
                'equipements' => 'Tables hautes, WiFi, Prises électriques',
                'batiment' => 'Bâtiment B',
                'etage' => 2,
                'active' => true,
            ],
            [
                'code' => 'C101',
                'nom' => 'Studio Média C101',
                'type' => 'Média',
                'capacite' => 25,
                'equipements' => 'Caméras, Éclairage, Son professionnel',
                'batiment' => 'Bâtiment C',
                'etage' => 1,
                'active' => true,
            ],
            [
                'code' => 'C102',
                'nom' => 'Bibliothèque C102',
                'type' => 'Bibliothèque',
                'capacite' => 80,
                'equipements' => 'Étagères, Ordinateurs, Zones silencieuses',
                'batiment' => 'Bâtiment C',
                'etage' => 1,
                'active' => true,
            ],
        ];

        foreach ($salles as $salle) {
            Salle::create($salle);
        }
    }
}
