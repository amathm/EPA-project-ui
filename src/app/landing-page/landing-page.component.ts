import { Component, OnInit, OnChanges } from '@angular/core';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  private eatTypeProperty;

  constructor(private util: UtilService, private router: Router) { }

  ngOnInit() {
  }

  setEatType(value: string) {
    this.eatType = value;
    this.router.navigate(['products']);
  }

  get eatType() {
    return this.util.eatType;
  }

  set eatType(value) {
    this.util.eatType = value;
  }

}
