import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  //TODO: Settings for:
  // 1) Switching between team names and actual names throughout site
  // 2) Turning off overtime, changing max overtime value, or standard match value

  constructor() { }

  ngOnInit(): void {
  }

}
