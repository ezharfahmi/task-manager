import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  })
  loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    constructor(private fb: FormBuilder, private router: Router){}

    get username() {
        return this.loginForm.get('username');
      }

    get password(){
        return this.loginForm.get('password');
    }

    auth = false;

    onLogin(){
        const {username, password} = this.loginForm.value;

        if(username == 'user' && password == 'user@123'){
            localStorage.setItem('role', 'USER');
            localStorage.setItem('token', Math.random().toString());
            this.router.navigateByUrl('dashboard')
        }else if(username == 'admin' && password == 'admin@123'){
            localStorage.setItem('role', 'ADMIN');
            localStorage.setItem('token', Math.random().toString());
            this.router.navigateByUrl('admin-dashboard')
        }else{
          this.auth = true;
        }
    }
    
}
