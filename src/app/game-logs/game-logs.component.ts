import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from "@angular/cdk/a11y";

export interface Game {
  matchNumber: number;
  score: string;
  team1: string;
  team2: string;
  matchDate: string;
}

const data: Game[] = [
  {matchNumber: 1, score: '10-8', team1: 'Rob/Lou', team2: 'Trent/Adam', matchDate: '9/27/21'},
  {matchNumber: 2, score: '10-3', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '9/28/21'},
  {matchNumber: 3, score: '10-11', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '9/29/21'},
  {matchNumber: 4, score: '6-10', team1: "Rob/Matt", team2: 'Trent/Adam', matchDate: '9/30/21'},
  {matchNumber: 5, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/15/21'},
  {matchNumber: 6, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/15/21'},
  {matchNumber: 7, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/15/21'},
  {matchNumber: 8, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/15/21'},
  {matchNumber: 9, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/15/21'},
  {matchNumber: 10, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/15/21'},
];

@Component({
  selector: 'game-logs',
  templateUrl: './game-logs.component.html',
  styleUrls: ['./game-logs.component.scss']
})
export class GameLogsComponent implements OnInit {
  displayedColumns: string[] = ['matchNumber', 'score', 'team1', 'team2','matchDate'];
  dataSource = new MatTableDataSource<Game>(data);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
