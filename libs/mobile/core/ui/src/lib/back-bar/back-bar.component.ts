import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'adcm-back-bar',
  templateUrl: './back-bar.component.html',
  styleUrls: ['./back-bar.component.scss']
})
export class BackBarComponent {
  @Input() fullWidth = false;
  @Input() title: string;
  @Input() backTo: string;

  constructor(private _router: Router, private _location: Location) {}

  back() {
    if (this.backTo) {
      this._router.navigateByUrl(this.backTo);
    } else {
      this._location.back();
    }
  }
}
