<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Salles</title>
    <style>
/* Inlined minimal styles from resources/css/app.css to ensure Blade-rendered dashboard displays */
/* Reset et base */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; color: #333; }
.app-container { max-width: 1400px; margin: 0 auto; }
.app-header { background: white; border-radius: 16px; padding: 30px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
.app-title { font-size: 32px; font-weight: 700; color: #667eea; margin-bottom: 10px; }
.app-subtitle { color: #666; font-size: 16px; }
.nav-tabs { display: flex; gap: 10px; margin-bottom: 30px; }
.nav-tab { background: white; border: none; padding: 12px 24px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; }
.nav-tab.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.dashboard-title { color: white; font-size: 28px; margin-bottom: 25px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
.stat-card { background: white; border-radius: 16px; padding: 25px; display: flex; align-items: center; gap: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
.stat-value { font-size: 36px; font-weight: 700; margin-bottom: 5px; }
.dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; }
.dashboard-card { background: white; border-radius: 16px; padding: 25px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
.card-title { font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #333; }
.bar-wrapper { background: #f3f4f6; border-radius: 8px; height: 40px; position: relative; overflow: hidden; }
.bar-fill { background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; align-items: center; justify-content: flex-end; padding-right: 10px; transition: width 0.5s ease; }
.empty-state { text-align: center; padding: 40px; color: #9ca3af; font-size: 16px; }
.table-container { overflow-x: auto; }
.top-table { width: 100%; border-collapse: collapse; }
.top-table th { background: #f9fafb; padding: 12px; text-align: left; font-weight: 600; color: #666; border-bottom: 2px solid #e5e7eb; }
.top-table td { padding: 15px 12px; border-bottom: 1px solid #f3f4f6; }
.type-badge { background: #e0e7ff; color: #667eea; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; }
.capacity-badge { background: #d1fae5; color: #059669; padding: 6px 12px; border-radius: 12px; font-weight: 600; font-size: 14px; }
    </style>
</head>
<body>
    <div class="app-container">
        <div class="app-header">
            <h1 class="app-title">🏢 Gestion des Salles</h1>
            <p class="app-subtitle">Système de gestion et de suivi des salles</p>
        </div>

        <div class="nav-tabs">
            <button class="nav-tab active">📊 Tableau de Bord</button>
            <button class="nav-tab">📋 Liste des Salles</button>
            <button class="nav-tab">➕ Ajouter une Salle</button>
        </div>

        <div class="dashboard">
            <h2 class="dashboard-title">📊 Tableau de Bord</h2>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-content">
                        <div class="stat-value"><?php echo e($totalSalles ?? 0); ?></div>
                        <div class="stat-label">Salles Actives</div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-content">
                        <div class="stat-value"><?php echo e($capaciteTotale ?? 0); ?></div>
                        <div class="stat-label">Capacité Totale</div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-content">
                        <div class="stat-value"><?php echo e($capaciteMoyenne ?? 0); ?></div>
                        <div class="stat-label">Capacité Moyenne</div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-content">
                        <div class="stat-value"><?php echo e(count($sallesParBatiment ?? [])); ?></div>
                        <div class="stat-label">Bâtiments</div>
                    </div>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3 class="card-title">📋 Répartition par Type</h3>
                    <div class="chart-container">
                        <?php if(!empty($sallesParType)): ?>
                            <?php $__currentLoopData = $sallesParType; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $type => $count): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <div class="bar-item">
                                    <div class="bar-label"><?php echo e($type ?: 'Non spécifié'); ?></div>
                                    <div class="bar-wrapper">
                                        <?php $width = $totalSalles > 0 ? round(($count/$totalSalles)*100) : 0; ?>
                                        <div class="bar-fill" style="width: <?php echo e($width); ?>%;"><span class="bar-value"><?php echo e($count); ?></span></div>
                                    </div>
                                </div>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        <?php else: ?>
                            <p class="empty-state">Aucune donnée disponible</p>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="dashboard-card">
                    <h3 class="card-title">🏢 Répartition par Bâtiment</h3>
                    <div class="chart-container">
                        <?php if(!empty($sallesParBatiment)): ?>
                            <?php $__currentLoopData = $sallesParBatiment; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $batiment => $count): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <div class="bar-item">
                                    <div class="bar-label"><?php echo e($batiment ?: 'Non spécifié'); ?></div>
                                    <div class="bar-wrapper">
                                        <?php $width = $totalSalles > 0 ? round(($count/$totalSalles)*100) : 0; ?>
                                        <div class="bar-fill" style="width: <?php echo e($width); ?>%;"><span class="bar-value"><?php echo e($count); ?></span></div>
                                    </div>
                                </div>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        <?php else: ?>
                            <p class="empty-state">Aucune donnée disponible</p>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="dashboard-card dashboard-card-full">
                    <h3 class="card-title">🏆 Top 5 - Plus Grandes Salles</h3>
                    <div class="table-container">
                        <?php if(!empty($topSalles) && $topSalles->count() > 0): ?>
                            <table class="top-table">
                                <thead>
                                    <tr>
                                        <th>Rang</th>
                                        <th>Code</th>
                                        <th>Nom</th>
                                        <th>Type</th>
                                        <th>Bâtiment</th>
                                        <th>Capacité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php $__currentLoopData = $topSalles; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $salle): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <tr>
                                            <td><?php echo e($index + 1); ?></td>
                                            <td><strong><?php echo e($salle->code); ?></strong></td>
                                            <td><?php echo e($salle->nom); ?></td>
                                            <td><span class="type-badge"><?php echo e($salle->type ?? '-'); ?></span></td>
                                            <td><?php echo e($salle->batiment ?? '-'); ?></td>
                                            <td><span class="capacity-badge">👥 <?php echo e($salle->capacite); ?></span></td>
                                        </tr>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                </tbody>
                            </table>
                        <?php else: ?>
                            <p class="empty-state">Aucune salle disponible</p>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
<?php /**PATH C:\Users\yannik KOLOKO NGAHA\Desktop\Gestions des salles\resources\views/salles.blade.php ENDPATH**/ ?>