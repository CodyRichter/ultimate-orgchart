import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'employee-transfer',
  templateUrl: './employee-transfer.component.html',
  styleUrls: ['./employee-transfer.component.css']
})
export class EmployeeTransferComponent implements OnInit {

  selectedEmployee: string;
  selectedManager: string;
  employees = [];
  managers = [];

  constructor(private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  async fetchEmployees() {
    await this.employeeService
                  .getAllEmployees()
                  .then(res => res.map(res => {
                    this.employees.push(res);
                    if (res.isManager) {
                      this.managers.push(res);
                    }
                  }))
                  .catch(error => console.log(error));
  }

}
