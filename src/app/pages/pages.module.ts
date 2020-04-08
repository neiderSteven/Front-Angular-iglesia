//modulos
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { PAGES_ROUTES } from './pages.routes';

// ng2-charts
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './iglesia/progress.component';
import { Graficas1Component } from './graficos/graficas1.component';

// componentes
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { IglesiaComponent } from '../pages/iglesias/iglesia.component';
import { VisitasComponent } from './visitas/visitas.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        IglesiaComponent,
        VisitasComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    providers:[
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyAX9jgVl3vLuFyG9NiQXtiaTZwkU9KZsHg&units'//'AIzaSyDt61pMoY5urBxRFvCjnsZXlgiLVa1ZHiQ'
        })
    ]
})
export class PagesModule { }