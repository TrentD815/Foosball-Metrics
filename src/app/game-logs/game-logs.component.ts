import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  matchNumber: number;
  score: string;
  team1: string;
  team2: string;
  matchDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {matchNumber: 1, score: '10-6', team1: 'Rob/Lou', team2: 'Trent/Adam', matchDate: '10/15/21'},
  {matchNumber: 2, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/15/21'},
  {matchNumber: 3, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/15/21'},
  {matchNumber: 4, score: '10-6', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '10/15/21'},
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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() {}
  ngOnInit(): void {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }
}
