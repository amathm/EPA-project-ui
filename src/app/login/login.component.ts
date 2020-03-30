import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public loginSuccess = false;
    public loggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;
    public loginError = false;
    public token;
    public stripeCustomerId = localStorage.getItem('stripeCustomer');

    constructor(private fb: FormBuilder, private http: HttpClient, private api: ApiService, private router: Router) {
      this.loginForm = fb.group({
        name: [null, Validators.required],
        password: [null, Validators.required],
        email: [null, Validators.email],
        stripeCustomer: [this.stripeCustomerId]
      });
    }

    ngOnInit() {
      console.log(this.loginSuccess);
    }

    send() {
      console.log(this.loginForm.value);
    }

    get name() {
      return this.loginForm.get('name');
    }

    get password() {
      return this.loginForm.get('password');
    }

    get email() {
      return this.loginForm.get('email');
    }

    reset() {
      this.loginForm.reset();
    }

    submitForm(form) {
      this.api.loginUser(form).subscribe((data: any) => {
        this.loginSuccess = true;
        this.token = data.token;
        this.api.token = data.token;
        localStorage.setItem('token', data.token);
        localStorage.setItem('loggedIn', 'true');
        console.log(data);
        window.alert(data.message);
        this.router.navigateByUrl('/products');
        console.log(data);
      }, (err) => {
        console.log(err);
        this.loginError = true;
        window.alert('incorrect credentials');
      });
    }

  }
