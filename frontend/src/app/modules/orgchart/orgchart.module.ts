import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { ChartNodeComponent } from './chart-node/chart-node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NodeSelectService } from './shared/services/node-select.service';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ChartContainerComponent, ChartNodeComponent],
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
