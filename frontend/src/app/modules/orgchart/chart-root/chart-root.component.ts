import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../shared/models/node.model';

@Component({
  selector: 'orgchart',
  templateUrl: './chart-root.component.html',
  styleUrls: ['./chart-root.component.css']
})
export class ChartRootComponent implements OnInit {

  @Input() datasource: Node;

  constructor() {
  }

  ngOnInit(): void {
  }

}
