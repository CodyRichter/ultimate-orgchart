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
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChartsComponent, SettingsDialog, SearchDialog } from './components/charts/charts.component';
import { SettingsComponent, JSONUploadDialog, EmployeeTransferDialog, ProjectCreateDialog, CreateEmployeeDialog } from './components/settings/settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { EmployeeTransferComponent } from './components/employee-transfer/employee-transfer.component';
import { SearchComponent } from './components/search/search.component';
import { OrgchartModule } from './modules/orgchart/orgchart.module';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProjectListComponent } from './components/project-list/project-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
    CreateEmployeeComponent,
    CreateEmployeeDialog
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
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
    MatDividerModule,
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
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
