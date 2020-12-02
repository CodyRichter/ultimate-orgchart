import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/index';
import { StackListComponent } from './stack-list/stack-list.component';
import { ChartColorComponent } from '../chart-color/chart-color.component';

@Component({
  selector: 'chart-stack',
  templateUrl: './chart-stack.component.html',
  styleUrls: ['./chart-stack.component.css']
})
export class ChartStackComponent implements OnInit {

  @Input() datasource: Employee[];

  constructor(private readonly dialog: MatDialog,
              private readonly color: ChartColorComponent) { }

  ngOnInit(): void {
  }

  onStackClick(): void {
    this.dialog.open(StackListComponent, {
        data: { stackData: this.datasource }
    });
  }


  ngOnChanges (changes: SimpleChanges){
    if (changes.datasource){
      // console.log('stack data data source changed to: ', this.datasource);
    }
  }

  getColor(pos): string {
    return this.color.getCardColor(pos);
  }

}
