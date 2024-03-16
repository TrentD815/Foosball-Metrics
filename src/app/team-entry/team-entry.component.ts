import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { HttpClient } from '@angular/common/http';
import { MatSort } from "@angular/material/sort";

export interface Team {
  teamName: string;
  player1: string;
  player2: string;
}
@Component({
  selector: 'teams',
  templateUrl: './team-entry.component.html',
  styleUrls: ['./team-entry.component.scss']
})
export class TeamEntryComponent implements OnInit {
  displayedColumns: string[] = ['teamName', 'player1', 'player2'];
  dataSource: any
  toastDuration = 5;
  teamName ?: string;
  player1Name ?: string;
  player2Name ?: string;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @ViewChild(MatSort) sort?: MatSort;
  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<any>('http://localhost:4100/teams').subscribe(response => {
      this.dataSource = new MatTableDataSource<Team>(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  addTeam(action: string) {
    const response = this.checkValidTeam(this.teamName, this.player1Name, this.player2Name)
    const isValidTeam = response[0];
    const message = response[1].toString();

    if (isValidTeam) {
      const newTeam = {
        teamName: this.teamName,
        player1: this.player1Name,
        player2: this.player2Name
      }
      console.log(newTeam)
      const result = this.http.post<any>('http://localhost:4100/teams', newTeam).subscribe(response => {
        console.log(response)
      })
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
        return [false, "A team cannot have 2 of the same player. Please differentiate between the players."]
      }
      else {
        return [true, "Team added successfully!"]
      }
  }
}
