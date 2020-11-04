import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/index';
import { MatDialog } from '@angular/material/dialog';
import { NodeDetailComponent } from './node-detail/node-detail.component';

@Component({
  selector: 'chart-node',
  templateUrl: './chart-node.component.html',
  styleUrls: ['./chart-node.component.css']
})
export class ChartNodeComponent implements OnInit {

  @Input() nodeData: Employee;

  @Output() nodeClick = new EventEmitter<any>();

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onNodeClick(): void {
      this.dialog.open(NodeDetailComponent, {
          data: { nodeData: this.nodeData }
      });
  }

  getColor(pos): string {
    const color =
        {
          'Engineering Manager': '#FFBA00',
          CEO: '#3C9329',
          'Software Engineer II': '#0093FF',
          'Tech Lead': '#019592',
          'Software Engineer I': '#7F39FB',
          'Research Manager': '#E57373',
          'Software Architect': '#00BCD4',
          'Senior Software Engineer': '#E57373'
        };
    return 'background: linear-gradient(0deg, white 80%,' + color[pos] +  ' 20%);';
  }

}
