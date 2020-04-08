import { RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './iglesia/progress.component';
import { Graficas1Component } from './graficos/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { IglesiaComponent } from '../pages/iglesias/iglesia.component';
import { VisitasComponent } from './visitas/visitas.component';
import { PromesasComponent } from './promesas/promesas.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'principal', component: DashboardComponent, data: { titulo: 'Principal' } },
            { path: 'iglesia', component: ProgressComponent, canActivate:[AdminGuard] , data: { titulo: 'Iglesias' } },
            { path: 'iglesias/:id', component: IglesiaComponent, data: { titulo: 'Iglesias' } },
            { path: 'visitas/:id', component: VisitasComponent, data: { titulo: 'Visitas-Info' } },
            { path: 'reuniones', component: Graficas1Component, data: { titulo: 'Reuniones' } },
            //{ path: 'promesas', component: PromesasComponent, data: { titulo: 'Iglesia' } },
            //{ path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: '', redirectTo: '/principal', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
