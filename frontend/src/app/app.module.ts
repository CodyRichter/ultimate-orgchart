import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChartsComponent, SettingsDialog, SearchDialog } from './components/charts/charts.component';
import { SettingsComponent, JSONUploadDialog, EmployeeTransferDialog, ProjectCreateDialog, CreateEmployeeDialog } from './components/settings/settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TokenInterceptor } from './services/auth/auth-interceptor.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { EmployeeTransferComponent } from './components/employee-transfer/employee-transfer.component';
import { SearchComponent } from './components/search/search.component';
import { OrgchartModule } from './modules/orgchart/orgchart.module';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectListComponent } from './components/project-list/project-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
//import {EditNodeDialogComponent} from './components/edit-node-dialog/edit-node-dialog.component';
import {EditNodeDialogComponent} from './edit-node-dialog/edit-node-dialog.component';
import {EditNodeDialog} from './modules/orgchart/chart-node/node-detail/node-detail.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {EditUserInfo} from './components/settings/settings.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProjectEditComponent } from './components/project-detail/project-edit/project-edit.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChartsComponent,
    NotFoundComponent,
    FileUploadComponent,
    JSONUploadDialog,
    EmployeeTransferComponent,
    EmployeeTransferDialog,
    SettingsDialog,
    SearchDialog,
    SettingsComponent,
    SearchComponent,
    NotificationCardComponent,
    ProjectDetailComponent,
    CreateProjectComponent,
    ProjectCreateDialog,
    ProjectListComponent,
    EditNodeDialogComponent,
    EditNodeDialog,
    EditUserComponent,
    EditUserInfo,
    CreateProjectComponent,
    CreateEmployeeComponent,
    CreateEmployeeDialog,
    ProjectEditComponent
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatPaginatorModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OrgchartModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
    MatGridListModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'charts',
        component: ChartsComponent
      },
      {
        path: '**',
        redirectTo: '/404',
      },
      {
        path: '404',
        component: NotFoundComponent
      }
    ]),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
