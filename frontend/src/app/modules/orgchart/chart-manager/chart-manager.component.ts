import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { StackListComponent } from '../chart-stack/stack-list/stack-list.component';
import { Node } from '../shared/models/node.model';

@Component({
  selector: 'chart-manager',
  templateUrl: './chart-manager.component.html',
  styleUrls: ['./chart-manager.component.css'],
})

export class ChartManagerComponent implements OnInit {

  @Input() datasource: Node;
  @Input() ignore = false;

  constructor(private readonly employeeService: EmployeeService, private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  checkDepth(nodes: any[]): boolean {
    return nodes.some(node => node.manages.length > 0);
  }

  async onNavigateClickSingle(node: any): Promise<void> {
    await this.employeeService.goDownInChart(node);
  }

  onNavigateClickStack(nodes: any[]): void {
    this.dialog.open(StackListComponent, {
        data: { stackData: nodes.filter(node => node.manages.length > 0), details: false }
    });
  }
}
