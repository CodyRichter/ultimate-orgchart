import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Employee } from '../../../../models';
import { EmployeeService } from '../../../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartColorComponent } from '../../chart-color/chart-color.component';
import { TransferRequestComponent } from '../transfer-request/transfer-request.component';

@Component({
  selector: 'chart-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent implements OnInit {

  nodeData: Employee;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private readonly employeeService: EmployeeService,
              private readonly snackbar: MatSnackBar,
              private readonly color: ChartColorComponent,
              private readonly dialog: MatDialog) {
    this.nodeData = data.nodeData;
  }

  ngOnInit(): void {
  }

  getColor(pos: string): string {
    return this.color.getHexColor(pos);
  }

  async onDeleteEmployee(): Promise<void> {
    await this.employeeService.deleteEmployeeById(this.nodeData._id);
    this.snackbar.open(this.nodeData.firstName + ' ' + this.nodeData.lastName + ' has been removed.',
          'Done', {horizontalPosition: 'end'});
  }

  async onTransferEmployee(): Promise<void> {
    this.dialog.open(TransferRequestComponent);
  }

}
