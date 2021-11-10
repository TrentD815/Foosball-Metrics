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
  isOvertime = false;
  isByPlayerOrTeam ?: string;
  player1Team1 ?: string;
  player2Team1 ?: string;
  player1Team2 ?: string;
  player2Team2 ?: string;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  teams: Team[] = [
    {value: 'Dev Team', viewValue: 'Dev Team'},
    {value: 'Sales Team', viewValue: 'Sales Team'},
    {value: 'Sales Alternate Team', viewValue: 'Sales Alternate Team'}
  ];

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }
  addGame(action: string) {
    const response = this.checkValidGame(this.slider1Value, this.slider2Value)
    const isValidGame = response[0];
    const message = response[1].toString();

    if (isValidGame) {
      let game = {
        date : this.date.value,
        team1Score : this.slider1Value,
        team2Score : this.slider2Value,
        isOvertime: this.isOvertime,
      }
      if (this.isByPlayerOrTeam === "By Players") {
        // @ts-ignore
        game["player1Team1"] = this.player1Team1;
        // @ts-ignore
        game["player2Team1"] = this.player2Team1;
        // @ts-ignore
        game["player1Team2"] = this.player1Team2;
        // @ts-ignore
        game["player2Team2"] = this.player2Team2;
      }
      else {
        // @ts-ignore
        game["selectedTeam1"] = this.selectedTeam1;
        // @ts-ignore
        game["selectedTeam2"] = this.selectedTeam2;
      }
      // TODO: Send off to DB to be saved
      console.log(game)
      this._snackBar.open(message, action, {duration: this.toastDuration * 1000});
    }
    else {
        this._snackBar.open(message, action, {duration: this.toastDuration * 1000});
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
      document.getElementById("team1PlayerContainer")?.classList.remove("hidden");
      document.getElementById("team2PlayerContainer")?.classList.remove("hidden");
      document.getElementById("team1Chooser")?.classList.add("hidden");
      document.getElementById("team2Chooser")?.classList.add("hidden");
    }
    else {
      document.getElementById("team1PlayerContainer")?.classList.add("hidden");
      document.getElementById("team2PlayerContainer")?.classList.add("hidden");
      document.getElementById("team1Chooser")?.classList.remove("hidden");
      document.getElementById("team2Chooser")?.classList.remove("hidden");
    }
  }
  checkValidGame(score1: number, score2: number) {
    // Prevent unfinished game
    if (score1 < 10 && score2 < 10) {
      return [false, "One team must have at least 10 points to win!"]
    }
    // Prevent equal score game
    else if (score1 === score2) {
      return [false, "Teams cannot have the same score. One team must win!"]
    }
    // Edge case to allow for 15-14 ultimatum score
    else if ((score1 === 15 || score2 === 15) && ((Math.abs(score1 - score2)) === 1)) {
      return [true, "Game logged successfully!"]
    }
    // Don't allow breakage of Win By 2 rule for scores higher than 10
    else if ((score1 > 10 || score2 > 10) && ((Math.abs(score1 - score2)) !== 2)) {
      return [false, "The game went into overtime but a team did not win by exactly 2!"]
    }
    // Otherwise valid match
    return [true, "Game logged successfully!"]
  }
}
