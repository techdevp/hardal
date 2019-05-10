import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ng-fullcalendar';
// import { Options } from 'fullcalendar';
import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from './../../app.global';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  zoom: number = 8;
  // calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  // initial center position for the map
  latitude: number = 51.673858;
  longitude: number = 7.815982;
  markers: any;
  total_count: any;
  posts_count: any;
  layout: any;
  users: any;

  constructor(private dashboardService: DashboardService) {
    // this.calendarOptions = {
    //   editable: true,
    //   eventLimit: false,
    //   header: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'month,agendaWeek,agendaDay,listMonth'
    //   }
    //
    // };
    this.dashboardService.postCount()
      .then((res: any) => {
        console.log(res)
        this.posts_count = res.data;
      })
      .catch((error: any) => {
        // this.spinnerService.hide();
        console.log(error)
      });
    this.dashboardService.getTopLayout()
      .then((res: any) => {
        console.log(res)
        this.layout = res.data;
      })
      .catch((error: any) => {
        // this.spinnerService.hide();
        console.log(error)
      });
    this.dashboardService.getTopUsers()
      .then((res: any) => {
        console.log(res)
        this.users = res;
      })
      .catch((error: any) => {
        // this.spinnerService.hide();
        console.log(error)
      });
    this.dashboardService.getDetails()
      .then((res: any) => {
        console.log(res)

      })
      .catch((error: any) => {
        // this.spinnerService.hide();
        console.log(error)
      });

    this.markers = [
      { latitude: 31.2240, longitude: 75.7708 },
      { latitude: 30.9010, longitude: 75.8573 },
      { latitude: 30.7046, longitude: 76.7179 },
      { latitude: 33.727111, longitude: 10.371124 },
      { latitude: 34.848588, longitude: 51.209834 }, ,
      { latitude: 33.851702, longitude: 71.216968 },
      { latitude: -35.304724, longitude: 148.662905 },
      { latitude: -36.817685, longitude: 175.699196 },
      { latitude: -36.828611, longitude: 175.790222 },
      { latitude: -37.750000, longitude: 145.116667 },
      { latitude: -37.759859, longitude: 145.128708 },
      { latitude: -37.765015, longitude: 145.133858 },
      { latitude: -37.770104, longitude: 145.143299 },
      { latitude: -37.773700, longitude: 145.145187 },
      { latitude: -37.774785, longitude: 145.137978 },
      { latitude: -37.819616, longitude: 144.968119 },
      { latitude: -38.330766, longitude: 144.695692 },
      { latitude: -39.927193, longitude: 175.053218 },
      { latitude: -41.330162, longitude: 174.865694 },
      { latitude: -42.734358, longitude: 147.439506 },
      { latitude: -42.734358, longitude: 147.501315 },
      { latitude: -42.735258, longitude: 147.438000 },
      { latitude: 43.999792, longitude: 170.463352 }
    ]

    this.dashboardService.totalCount()
      .then((res: any) => {
        console.log(res)
        this.total_count = res.data;
      })
      .catch((error: any) => {
        // this.spinnerService.hide();
        console.log(error)
      });
  }

  public lineChartData: Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartDatasingle: Array<any> = [
    [65, 59, 80, 81, 56, 55, 40]

  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartLabelsDta: Array<any> = ['10', '12', '14', '16', '18'];
  public lineChartType: string = 'line';

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
}
