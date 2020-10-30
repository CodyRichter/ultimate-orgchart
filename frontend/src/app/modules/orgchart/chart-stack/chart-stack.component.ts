import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../shared/models/node.model';

@Component({
  selector: 'chart-stack',
  templateUrl: './chart-stack.component.html',
  styleUrls: ['./chart-stack.component.css']
})
export class ChartStackComponent implements OnInit {

  @Input() datasource: Node;

  constructor() { }

  ngOnInit(): void {
  }

}
