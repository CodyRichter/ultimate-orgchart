import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'chart-stack',
  templateUrl: './chart-stack.component.html',
  styleUrls: ['./chart-stack.component.css']
})
export class ChartStackComponent implements OnInit {

  @Input() datasource;

  constructor() { }

  ngOnInit(): void {
  }

}
