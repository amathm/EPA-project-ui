import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public endPoint = 'http://localhost:3001';
  public customerData = {};
  public customerCreated = false;
  public userData;
  public token;
  public balance;
  public registered = false;
  public stripeCustomerId = localStorage.getItem('stripeCustomer');

  public loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')) || false;

  constructor(private http: HttpClient, private router: Router) {
  }

  getIsLoggedIn() {
    return this.loggedInStatus;
  }

  getProducts() {
    return this.http.get(`${this.endPoint}/products/`);
  }

  getClientSecret() {
    return this.http.get(`${this.endPoint}/payment/secret`);
  }

  createCustomer(body) {
    return this.http.post(`${this.endPoint}/payment/create/customer`, body).subscribe(data => {
      this.customerData = data;
      this.customerCreated = true;
      console.log(this.customerData);
    });
  }

  signupUser(userData) {
    return this.http.post(`${this.endPoint}/user/signup`, userData);
  }

  loginUser(userData) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${this.endPoint}/user/login`, userData);
  }

  payEndpoint(userData) {
    return this.http.post(`${this.endPoint}/user/pay`, userData);
  }

  logOut() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('balance');
    return this.getIsLoggedIn();
  }
}
