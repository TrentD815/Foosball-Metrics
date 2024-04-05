import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {MatTableDataSource} from "@angular/material/table";

import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  dataSource: any
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getAllStats()
  }

  getAllStats() {
    this.http.get<any>('http://localhost:4100/stats').subscribe(response => {
      this.dataSource = response[0]
      console.log(this.dataSource)
    })
  }
  refreshAllStats() {
    this.http.get<any>('http://localhost:4100/refreshStats').subscribe(response => {
      this.dataSource = response[0]
      console.log(this.dataSource)
    })
  }

}
