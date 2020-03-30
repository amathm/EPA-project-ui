import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public loggedIn;
  public token;
  public balance;

  constructor(private api: ApiService, private route: Router) {
    this.loggedIn = this.api.getIsLoggedIn();
    console.log(this.loggedIn);
  }

  ngOnInit() {
    if (this.api.getIsLoggedIn()) {
      this.loggedIn = true;
    }
  }

  loggedInStatus() {
    if (this.loggedIn) {
      this.balance = Number(localStorage.getItem('balance')).toFixed(2) || 0;
      this.token = this.api.token;
      // this.route.navigateByUrl('/products');
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    window.alert('logged out');
    this.loggedIn = false;
    this.route.navigateByUrl('/products');
    return this.api.logOut();
  }

  getBalance() {
    return this.balance;
  }

}
