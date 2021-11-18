import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Game} from "../game-logs/game-logs.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

export interface Team {
  teamName: string;
  player1: string;
  player2: string;
}
const data: Team[] = [
  {teamName: 'Dev Team', player1: 'Trent Davis', player2: 'Adam Bennett'},
  {teamName: "Sales Team", player1: 'Rob Cathell', player2: 'Lou Raymond'},
  {teamName: "Sales Team #2", player1: 'Rob Cathell', player2: 'Matt Cayer'},
  {teamName: "The Kyles", player1: 'Kyle McDuffie', player2: 'Kyle Brown'},
  {teamName: "Kyle & Tim", player1: 'Kyle McDuffie', player2: 'Tim Histen'},
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
