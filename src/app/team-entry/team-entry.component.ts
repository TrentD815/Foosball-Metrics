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
  {teamName: 'Dev Team', player1: 'Trent', player2: 'Adam'},
  {teamName: "Sales Team", player1: 'Rob', player2: 'Lou'},
  {teamName: "Sales Team #2", player1: 'Rob', player2: 'Matt'},
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
