import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'game-entry',
  templateUrl: './game-entry.component.html',
  styleUrls: ['./game-entry.component.scss','../app.component.scss']
})
export class GameEntryComponent implements OnInit {
  date = new FormControl(new Date());
  autoTicks = false;
  showTicks = false;
  value = 0;
  tickInterval = 1;
  constructor() { }

  ngOnInit(): void {}

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }

}
