import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/index';

@Component({
  selector: 'orgchart',
  templateUrl: './chart-root.component.html',
  styleUrls: ['./chart-root.component.css']
})
export class ChartRootComponent implements OnInit {

  @Input() datasource: Employee;

  constructor(private readonly employeeService: EmployeeService) {
  }

  ngOnInit(): void {
  }
  
  filterEmployees(node: Employee): boolean {
    return node.manages.length === 0;
  }

  async onNavigateClick(employee: Employee): Promise<void> {
    await this.employeeService.goUpInChart(employee);
  }

}
