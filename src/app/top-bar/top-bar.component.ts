import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Input() public eatType;
  @Input() public type = {
    food: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
