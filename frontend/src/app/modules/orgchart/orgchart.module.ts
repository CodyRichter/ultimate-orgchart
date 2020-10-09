import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { ChartNodeComponent } from './chart-node/chart-node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NodeSelectService } from './shared/services/node-select.service';

@NgModule({
  declarations: [ChartContainerComponent, ChartNodeComponent],
  exports: [
    ChartContainerComponent,
    ChartNodeComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [NodeSelectService]
})
export class OrgchartModule { }
