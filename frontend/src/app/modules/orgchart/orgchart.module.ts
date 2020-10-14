import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { ChartNodeComponent } from './chart-node/chart-node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NodeSelectService } from './shared/services/node-select.service';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRippleModule } from '@angular/material/core';

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
        DragDropModule,
        MatRippleModule
    ],
  providers: [NodeSelectService]
})
export class OrgchartModule { }
