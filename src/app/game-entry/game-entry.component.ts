import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCheckboxChange} from "@angular/material/checkbox";

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
  slider1Value = 0;
  slider2Value = 0;
  tickInterval = 1;
  toastDuration = 5;
  selectedTeam1 ?: string;
  selectedTeam2 ?: string;
  max = 10;
  isOvertime ?: boolean;
  isByPlayerOrTeam ?: string;

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
    const isValidGame = this.checkValidGame(this.slider1Value, this.slider2Value)
    if (isValidGame) {
      const game = {
        date : this.date.value,
        team1Score : this.slider1Value,
        team2Score : this.slider2Value
      }
      console.log(game)
      this._snackBar.open(message, action, {duration: this.toastDuration * 1000});
    }
    else {
      this._snackBar.open("One team must have at least 10 points to win!", action, {duration: this.toastDuration * 1000});
    }
  }

  toggleOvertime(checked: boolean) {
    (checked) ? this.max = 15 : this.max = 10
    this.isOvertime = this.isOvertime === checked;
    if (this.slider1Value > 10) { this.slider1Value = 10; }
    if (this.slider2Value > 10) { this.slider2Value = 10; }
  }

  toggleByPlayersOrTeam(playersOrTeam: string) {
    this.isByPlayerOrTeam = playersOrTeam;
    if (playersOrTeam === "By Players") {
      console.log("players");
      document.getElementById("team1PlayerContainer")?.classList.remove("hidden");
      document.getElementById("team2PlayerContainer")?.classList.remove("hidden");
      document.getElementById("team1Chooser")?.classList.add("hidden");
      document.getElementById("team2Chooser")?.classList.add("hidden");
    }
    else {
      console.log("team");
      document.getElementById("team1PlayerContainer")?.classList.add("hidden");
      document.getElementById("team2PlayerContainer")?.classList.add("hidden");
      document.getElementById("team1Chooser")?.classList.remove("hidden");
      document.getElementById("team2Chooser")?.classList.remove("hidden");
    }
  }
  checkValidGame(score1: number, score2:number) {
    if (score1 < 10 && score2 < 10) {
      return false
    }
    //TODO: Add logic for win by 2 must be exactly 2 differential
    return true
  }
}
