import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { StackListComponent } from '../chart-stack/stack-list/stack-list.component';
import { Employee } from 'src/app/models/index';

@Component({
  selector: 'chart-manager',
  templateUrl: './chart-manager.component.html',
  styleUrls: ['./chart-manager.component.css'],
})

export class ChartManagerComponent implements OnInit {

  @Input() datasource: Employee;
  @Input() ignore = false;
  @Input() stack: Employee[];

  constructor(private readonly employeeService: EmployeeService, private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  checkDepth(nodes: Employee[]): boolean {
    return nodes.some(node => node.manages.length > 0);
  }

  async onNavigateClickSingle(node: Employee): Promise<void> {
    await this.employeeService.goDownInChart(node);
  }

  onNavigateClickStack(nodes: Employee[]): void {
    this.dialog.open(StackListComponent, {
        data: { stackData: nodes.filter(node => node.manages.length > 0), details: false }
    });
  }

  filterEmployees(node: Employee): boolean {
    return node.manages.length === 0;
  }

}
