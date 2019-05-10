import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { DashboardService } from './../../services/dashboard/dashboard.service';
//import { FullCalendarModule } from 'ng-fullcalendar'
@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CommonModule,
    //  FullCalendarModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAJdy92hH0_qlvPnzIzdyllzCj1tjmJvb4'
    }),
    AgmJsMarkerClustererModule
  ],
  declarations: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule {

}
