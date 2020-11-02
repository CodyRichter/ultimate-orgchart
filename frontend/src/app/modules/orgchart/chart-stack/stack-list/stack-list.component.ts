import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { NodeDetailComponent } from '../../chart-node/node-detail/node-detail.component';
import { Node } from '../../shared/models/node.model';


@Component({
  selector: 'app-stack-list',
  templateUrl: './stack-list.component.html',
  styleUrls: ['./stack-list.component.css']
})
export class StackListComponent implements OnInit {


  stackData: Node[];
  details = true;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private readonly dialog: MatDialog,
              private readonly employeeService: EmployeeService) {
    this.stackData = data.stackData;
    if (data.details !== undefined) {
      this.details = data.details;
    }
  }

  onDetailsClick(node: any): void {
    this.dialog.open(NodeDetailComponent, {
        data: { nodeData: node }
    });
  }

  onNavigateClick(node: any): void {
    this.employeeService.goDownInChart(node);
    this.dialog.closeAll();
  }

  ngOnInit(): void {
  }

}
