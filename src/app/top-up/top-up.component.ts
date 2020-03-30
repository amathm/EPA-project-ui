import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.scss']
})
export class TopUpComponent implements OnInit {
  public topUpForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.topUpForm = fb.group({
      balance: [null, Validators.required],
      card: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.email]
    });
   }

  ngOnInit() {
  }

  get balance() {
    return this.topUpForm.get('balance');
  }

  get card() {
    return this.topUpForm.get('card');
  }

  get password() {
    return this.topUpForm.get('password');
  }

  get email() {
    return this.topUpForm.get('email');
  }

  send() {
    console.log(this.topUpForm.value);
  }

  reset() {
    this.topUpForm.reset();
  }

  submitForm(form) {
    this.api.loginUser(form).subscribe((data: any) => {
    }, (err) => {
    });
  }
}
