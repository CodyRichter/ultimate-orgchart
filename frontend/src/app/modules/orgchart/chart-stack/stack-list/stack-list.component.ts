import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { NodeDetailComponent } from '../../chart-node/node-detail/node-detail.component';
import { Employee } from 'src/app/models/index';


@Component({
  selector: 'app-stack-list',
  templateUrl: './stack-list.component.html',
  styleUrls: ['./stack-list.component.css']
})
export class StackListComponent implements OnInit {


  @Input() stackData: Employee[] = [];
  @Input() details = true;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private readonly dialog: MatDialog,
              private readonly employeeService: EmployeeService) {
    if (data.stackData) {
      this.stackData = data.stackData;
    }
    if (data.details !== undefined) {
      this.details = data.details;
    }
  }

  onDetailsClick(node: Employee): void {
    this.dialog.open(NodeDetailComponent, {
        data: { nodeData: node }
    });
  }

  async onNavigateClick(node: Employee): Promise<void> {
    await this.employeeService.goDownInChart(node);
    this.dialog.closeAll();
  }

  ngOnInit(): void {
  }

}
