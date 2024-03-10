import { Component, OnInit } from '@angular/core';
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  //TODO: Settings for:
  // 1) Switching between team names and actual names throughout site
  // 2) Turning off overtime, changing max overtime value, or standard match value
  toastDuration = 5;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  toggleTeamNameOverPlayers(checked: boolean) {}

  toggleAllowOvertime(checked: boolean) {}

  updateSettings(action: string) {
    this._snackBar.open("Settings successfully updated!", action, {duration: this.toastDuration * 1000});
  }
}
