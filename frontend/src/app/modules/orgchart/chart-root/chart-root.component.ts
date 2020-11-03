import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Node } from '../shared/models/node.model';

@Component({
  selector: 'orgchart',
  templateUrl: './chart-root.component.html',
  styleUrls: ['./chart-root.component.css']
})
export class ChartRootComponent implements OnInit {

  @Input() datasource: Node;

  chartStack: any[];
  constructor(private readonly employeeService: EmployeeService) {
    this.chartStack = employeeService.chartStack;
  }

  ngOnInit(): void {
  }

  filterEmployees(node: Node): boolean {
    return node.manages.length === 0;
  }

  onNavigateClick(): void {
    this.employeeService.goUpInChart();
  }

}
