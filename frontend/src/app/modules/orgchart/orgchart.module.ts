import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { ChartNodeComponent } from './chart-node/chart-node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChartStackComponent } from './chart-stack/chart-stack.component';
import { ChartManagerComponent } from './chart-manager/chart-manager.component';
import { ChartRootComponent } from './chart-root/chart-root.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ChartContainerComponent,
    ChartNodeComponent,
    ChartStackComponent,
    ChartManagerComponent,
    ChartRootComponent
  ],
  exports: [
    ChartContainerComponent,
    ChartNodeComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: []
})
export class OrgchartModule { }
