import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    readonly ROOT_URL = 'http://localhost:3001/user/signup';

    constructor(private fb: FormBuilder, private http: HttpClient, private api: ApiService, private router: Router) {
      this.registerForm = fb.group({
        name: [null, Validators.required],
        password: [null, Validators.required],
        email: [null, Validators.email],
        balance: [0, Validators.required],
          address: [null, Validators.required],
          description: [null, Validators.required],
          currency: ['gbp', Validators.required],
      });
    }

    ngOnInit() {
    }

    send() {
      console.log(this.registerForm.value);
    }

    get name() {
      return this.registerForm.get('name');
    }

    get password() {
      return this.registerForm.get('password');
    }

    get email() {
      return this.registerForm.get('email');
    }

    get address() {
      return this.registerForm.get('address');
    }

    get description() {
      return this.registerForm.get('description');
    }

    get currency() {
      return this.registerForm.get('currency');
    }

    get balance() {
      return this.registerForm.get('balance');
    }

    reset() {
      this.registerForm.reset();
    }

    submitForm(form) {
      this.api.signupUser(form).subscribe((data: any ) => {
        this.api.registered = true;
        console.log(data);
        localStorage.setItem('balance', data.user.card.balance);
        localStorage.setItem('stripeCustomer', data.stripeCustomer.id);
        this.api.balance = localStorage.getItem('balance');
        this.router.navigateByUrl('/login');
        window.alert(data.message);
        return true;
      }, (err) => {
        alert(err.message);
        return false;
      });
    }
  }
