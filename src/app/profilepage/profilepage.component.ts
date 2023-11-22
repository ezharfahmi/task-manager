import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent {

  constructor(private _location: Location) {}

  userRole = localStorage.getItem('role');
  backClicked() {
    this._location.back();
  }

}
