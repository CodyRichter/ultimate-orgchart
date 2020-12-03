import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { Employee } from 'src/app/models/index';
import { MatDialog } from '@angular/material/dialog';
import { NodeDetailComponent } from './node-detail/node-detail.component';
import { ChartColorComponent } from '../chart-color/chart-color.component';
import { MatCard } from '@angular/material/card';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'chart-node',
  templateUrl: './chart-node.component.html',
  styleUrls: ['./chart-node.component.css']
})
export class ChartNodeComponent implements OnInit {

  @Input() nodeData: Employee;

  @Output() nodeClick = new EventEmitter<any>();

  constructor(private readonly dialog: MatDialog,
              private readonly color: ChartColorComponent) { }

  ngOnInit(): void {

  }

  onNodeClick(): void {
      this.dialog.open(NodeDetailComponent, {
          data: { nodeData: this.nodeData }
      });
  }

  getColor(pos): string {
    return this.color.getCardColor(pos);
  }

}
