import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'app-transfer-request',
  templateUrl: './transfer-request.component.html',
  styleUrls: ['./transfer-request.component.css']
})
export class TransferRequestComponent implements OnInit {

  myControl = new FormControl();
  employees: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private snackBar: MatSnackBar,
              private readonly employeeService: EmployeeService) {
    this.fetchEmployee().then();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  async fetchEmployee(): Promise<void> {
    for (let i = 1; i < 100; i++) {
      const employee = await this.employeeService.getEmployeeById(i);
      if (employee) {
        this.employees.push(employee.firstName + ' ' + employee.lastName);
      }
    }
  }

  openSnackBar(): void {
    this.snackBar.open('Request sent to Denis Matthews.', 'Done', {
      horizontalPosition: 'end'
    });
  }

}
