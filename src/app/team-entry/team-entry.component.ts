import {Component, OnInit, ViewChild} from '@angular/core';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';
import {Game} from "../game-logs/game-logs.component";
import {MatLegacyTableDataSource as MatTableDataSource} from "@angular/material/legacy-table";
import {MatLegacyPaginator as MatPaginator} from "@angular/material/legacy-paginator";

export interface Team {
  teamName: string;
  player1: string;
  player2: string;
}
const data: Team[] = [
  {teamName: 'Dev Team', player1: 'Trent D.', player2: 'Adam B.'},
  {teamName: "Sales Team", player1: 'Rob C.', player2: 'Lou R.'},
  {teamName: "Sales Alternate Team", player1: 'Rob C.', player2: 'Matt C.'},
  {teamName: "The Kyles", player1: 'Kyle M.', player2: 'Kyle B.'},
  {teamName: "Kyle & Tim", player1: 'Kyle M.', player2: 'Tim H.'},
  {teamName: "Trent & Lou", player1: 'Trent D.', player2: 'Lou R.'},
]
@Component({
  selector: 'teams',
  templateUrl: './team-entry.component.html',
  styleUrls: ['./team-entry.component.scss']
})
export class TeamEntryComponent implements OnInit {
  displayedColumns: string[] = ['teamName', 'player1', 'player2'];
  dataSource = new MatTableDataSource<Team>(data);
  toastDuration = 5;
  teamName ?: string;
  player1Name ?: string;
  player2Name ?: string;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  addTeam(action: string) {
    const response = this.checkValidTeam(this.teamName, this.player1Name, this.player2Name)
    const isValidTeam = response[0];
    const message = response[1].toString();

    if (isValidTeam) {
      const newTeam = {
        teamName: this.teamName,
        player1Name: this.player1Name,
        player2Name: this.player2Name
      }
      //TODO: Send team off to be saved in DB
      console.log(newTeam)

    }
    this._snackBar.open(message, action, {duration: this.toastDuration * 1000});
  }

  checkValidTeam(teamName: string | undefined, player1Name: string | undefined, player2Name: string | undefined) {
      //TODO: Check if team name is unique. Show toast if already taken

      //Check all fields are filled out
      if (!teamName?.trim() || !player1Name?.trim() || !player2Name?.trim()) {
        return [false, "Please be sure to fill in all the fields!"]
      }
      // Force names to be more differentiated
      else if (player1Name === player2Name) {
        return [false, "A team cannot have 2 of the same player!"]
      }
      else {
        return [true, "Team added successfully!"]
      }
  }
}
