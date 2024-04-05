import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from '@angular/common/http';

export interface Settings {
  showTeamName: boolean
  allowOvertime: boolean
  tableLocation: string
}

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  //TODO: Settings for:
  // 1) Switching between team names and actual names throughout site
  // 2) Turning off overtime, changing max overtime value, or standard match value
  toastDuration = 5
  dataSource: any = {}
  showTeamName: boolean = false
  allowOvertime: boolean = false
  tableLocation: string = ''

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:4100/settings').subscribe(response => {
      this.dataSource = response[0]
    })
  }

  toggleTeamNameOverPlayers(checked: boolean) { this.showTeamName = checked }
  toggleAllowOvertime(checked: boolean) { this.allowOvertime = checked }
  getTableLocation(value: string) { this.tableLocation = value }

  updateSettings(action: string) {
    const updatedSettings: Settings = {
      showTeamName: this.showTeamName,
      allowOvertime: this.allowOvertime,
      tableLocation: this.tableLocation
    }
    console.log(updatedSettings)
    this.http.put<any>('http://localhost:4100/settings',updatedSettings ).subscribe(response => {
      this._snackBar.open("Settings successfully updated!", action, {duration: this.toastDuration * 1000});
    })
  }
}
