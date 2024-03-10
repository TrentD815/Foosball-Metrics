import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatLegacyPaginator as MatPaginator} from "@angular/material/legacy-paginator";
import {MatSort, Sort} from '@angular/material/sort';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
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
  {matchNumber: 5, score: '3-10', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/1/21'},
  {matchNumber: 6, score: '11-13', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/4/21'},
  {matchNumber: 7, score: '10-8', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/5/21'},
  {matchNumber: 8, score: '5-10', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/6/21'},
  {matchNumber: 9, score: '10-12', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/7/21'},
  {matchNumber: 10, score: '10-5', team1: "Rob/Matt", team2: 'Trent/Adam', matchDate: '10/8/21'},
  {matchNumber: 11, score: '10-8', team1: "Rob/Matt", team2: 'Trent/Adam', matchDate: '10/11/21'},
  {matchNumber: 12, score: '1-10', team1: "Rob/Matt", team2: 'Trent/Adam', matchDate: '10/18/21'},
  {matchNumber: 13, score: '9-11', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/20/21'},
  {matchNumber: 14, score: '10-7', team1: "Rob/Matt", team2: 'Trent/Adam', matchDate: '10/21/21'},
  {matchNumber: 15, score: '10-6', team1: "Rob/Matt", team2: 'Trent/Adam', matchDate: '10/22/21'},
  {matchNumber: 16, score: '10-7', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/26/21'},
  {matchNumber: 17, score: '10-7', team1: "Rob/Matt", team2: 'Trent/Adam', matchDate: '10/27/21'},
  {matchNumber: 18, score: '10-6', team1: "Rob/Matt", team2: 'Trent/Adam', matchDate: '10/28/21'},
  {matchNumber: 19, score: '7-10', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '11/2/21'},
  {matchNumber: 20, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '11/2/21'},
  {matchNumber: 21, score: '1-10', team1: "Kyle/Kyle", team2: 'Trent/Adam', matchDate: '11/2/21'},
  {matchNumber: 22, score: '10-9', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '11/3/21'},
  {matchNumber: 23, score: '4-10', team1: "Rob/Lou", team2: 'Kyle/Tim', matchDate: '11/3/21'},
  {matchNumber: 24, score: '10-6', team1: "Rob/Matt", team2: 'Trent/Lou', matchDate: '11/4/21'},
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
