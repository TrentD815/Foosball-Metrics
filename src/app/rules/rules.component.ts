import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from "@angular/material/table";

export interface Rule {
  rule: string;
}
@Component({
  selector: 'rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  dataSource: string[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:4100/rules').subscribe(response => {
      this.dataSource = response
    })
  }

}
