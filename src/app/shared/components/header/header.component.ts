import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router){}

  userRole = localStorage.getItem('role');
  
  logout(){
    const confirmation = confirm('Do you want to logout?');
    if(confirmation){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigateByUrl('login');
    }
  }

  navigate(title: string) {
    this.router.navigateByUrl(title);
  }
}
