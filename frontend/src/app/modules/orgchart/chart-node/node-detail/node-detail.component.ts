import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../../../models';
import { EmployeeService } from '../../../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'chart-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent implements OnInit {

  nodeData: Employee;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private readonly employeeService: EmployeeService,
              private readonly snackbar: MatSnackBar) {
    this.nodeData = data.nodeData;
  }

  ngOnInit(): void {
  }

  getColor(pos: string): string {
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
    return 'background-color:' + color[pos] + ';';
  }

  async onDeleteEmployee(): Promise<void> {
    await this.employeeService.deleteEmployeeById(this.nodeData._id);
    this.snackbar.open(this.nodeData.firstName + ' ' + this.nodeData.lastName + ' has been removed.',
        'Done', {horizontalPosition: 'end'});
  }

}
