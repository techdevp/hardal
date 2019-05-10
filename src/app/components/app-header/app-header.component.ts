import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  header: any;
  constructor(public router: ActivatedRoute) {
    if (this.router && this.router.data)
      this.header = this.router.data;
  }
}
