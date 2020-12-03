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
import { MatDialogModule } from '@angular/material/dialog';
import { NodeDetailComponent } from './chart-node/node-detail/node-detail.component';
import { StackListComponent } from './chart-stack/stack-list/stack-list.component';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChartColorComponent } from './chart-color/chart-color.component';
import { TransferRequestComponent } from './chart-node/transfer-request/transfer-request.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { EmployeeProjectListComponent } from './chart-node/node-detail/employee-project-list/employee-project-list.component';
@NgModule({
  declarations: [
    ChartContainerComponent,
    ChartNodeComponent,
    ChartStackComponent,
    ChartManagerComponent,
    ChartRootComponent,
    NodeDetailComponent,
    StackListComponent,
    ChartColorComponent,
    TransferRequestComponent,
    EmployeeProjectListComponent
  ],
  exports: [
    ChartContainerComponent,
    ChartNodeComponent,
    StackListComponent,
    ScrollingModule,
    MatBadgeModule

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    ScrollingModule,
    MatListModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,
    MatGridListModule,
    MatInputModule,
    MatBadgeModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatMenuModule
  ],
  providers: [
    ChartColorComponent
  ]
})
export class OrgchartModule { }
