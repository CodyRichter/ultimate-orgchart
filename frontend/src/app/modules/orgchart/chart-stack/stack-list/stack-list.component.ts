import { ChangeDetectorRef, Component, Inject, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { NodeDetailComponent } from '../../chart-node/node-detail/node-detail.component';
import { Employee } from 'src/app/models/index';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-stack-list',
  templateUrl: './stack-list.component.html',
  styleUrls: ['./stack-list.component.css']
})
export class StackListComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  seenEmployees = {};

  @Input() stackData: Employee[] = [];
  @Input() nextUrl: string = undefined;
  @Input() details = true;
  @Input() find = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private readonly dialog: MatDialog,
              private readonly employeeService: EmployeeService, private readonly httpClient: HttpClient) {
    if (data.stackData) {
      this.stackData = data.stackData;
    }
    if (data.nextUrl) {
      this.nextUrl = data.nextUrl;
    }
    if (data.details !== undefined) {
      this.details = data.details;
    }
    if (data.find !== undefined) {
      this.find = data.find;
    }

    if (this.stackData) {
      this.stackData.forEach((element, index) => {this.seenEmployees[element._id] = index; });
      console.log('mapping done');
    }
  }

  async nextEmployee(event: any): Promise<void> {
    console.log('next');
    if (this.nextUrl) {
      const end = this.virtualScroll.getRenderedRange().end;
      console.log(end);
      const total = this.stackData.length;
      console.log(end);
      console.log(`${end}, '>=', ${total}`);
      if (end === total) {
        console.log(this.nextUrl);
        const result = await this.httpClient.get(`http://${this.nextUrl}`).toPromise() as any;
        this.nextUrl = result.nextEmployeeURL;
        (result.employees as Employee[]).forEach(employee => {
          if (this.seenEmployees[employee._id]) {
            this.stackData[this.seenEmployees[employee._id]] = employee;
          } else {
            this.stackData.push(employee);
            this.seenEmployees[employee._id] = this.stackData.length - 1;
          }
        });
        console.log(this.stackData);
      }
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

  async navigateToManager(node: Employee): Promise<void> {
    await this.employeeService.goUpInChart(node);
    this.dialog.closeAll();
  }

  trackByIdx(i) {
    console.log(i);
    return i;
  }

  ngOnInit(): void {
  }

}
