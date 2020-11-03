import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/index';
import { StackListComponent } from './stack-list/stack-list.component';

@Component({
  selector: 'chart-stack',
  templateUrl: './chart-stack.component.html',
  styleUrls: ['./chart-stack.component.css']
})
export class ChartStackComponent implements OnInit {

  @Input() datasource: Employee[];

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onStackClick(): void {
    this.dialog.open(StackListComponent, {
        data: { stackData: this.datasource }
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
