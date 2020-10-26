import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { ChartNodeComponent } from './chart-node/chart-node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NodeSelectService } from './shared/services/node-select.service';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChartStackComponent } from './chart-stack/chart-stack.component';
import { ChartManagerComponent } from './chart-manager/chart-manager.component';
import { ChartEmployeeComponent } from './chart-employee/chart-employee.component';
import { TestContainerComponent } from './test-container/test-container.component';
import { ChartRootComponent } from './chart-root/chart-root.component';

@NgModule({
  declarations: [ChartContainerComponent, ChartNodeComponent, ChartStackComponent, ChartManagerComponent, ChartEmployeeComponent, TestContainerComponent, ChartRootComponent],
  exports: [
    ChartContainerComponent,
    ChartNodeComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    DragDropModule
  ],
  providers: [NodeSelectService]
})
export class OrgchartModule { }
