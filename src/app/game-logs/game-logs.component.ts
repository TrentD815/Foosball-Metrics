import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import { HttpClient } from '@angular/common/http';

export interface Game {
  matchNumber: number;
  score: string;
  team1: string;
  team2: string;
  matchDate: string;
}

@Component({
  selector: 'game-logs',
  templateUrl: './game-logs.component.html',
  styleUrls: ['./game-logs.component.scss']
})
export class GameLogsComponent implements OnInit {
  displayedColumns: string[] = ['matchNumber', 'score', 'team1', 'team2','matchDate'];
  dataSource: any

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<any>('http://localhost:4100/games').subscribe(response => {
      this.dataSource = new MatTableDataSource<Game>(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
