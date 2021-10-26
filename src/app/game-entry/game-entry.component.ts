import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';

interface Team {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'game-entry',
  templateUrl: './game-entry.component.html',
  styleUrls: ['./game-entry.component.scss','../app.component.scss']
})
export class GameEntryComponent implements OnInit {
  date = new FormControl(new Date());
  autoTicks = false;
  showTicks = true;
  value = 0;
  tickInterval = 1;
  toastDuration = 5;
  selectedValue ?: string;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  teams: Team[] = [
    {value: 'team-0', viewValue: 'Trent/Adam'},
    {value: 'team-1', viewValue: 'Rob/Lou'},
    {value: 'team-2', viewValue: 'Rob/Matt'}
  ];

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }
  addGame(message: string, action: string) {
    this._snackBar.open(message, action, {duration: this.toastDuration * 1000});
  }
}
