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
  constructor(private _snackBar: MatSnackBar) {}
  ngOnInit(): void {}

  addTeam(message: string, action: string) {
    this._snackBar.open(message, action, {duration: this.toastDuration * 1000});
  }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }
}
