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
import { SettingsComponent, JSONUploadDialog, EmployeeTransferDialog } from './components/settings/settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { EmployeeTransferComponent } from './components/employee-transfer/employee-transfer.component';
import { SearchComponent } from './components/search/search.component';
import { OrgchartModule } from './modules/orgchart/orgchart.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';

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
    NotificationCardComponent
  ],
  imports: [
    BrowserModule,
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
    MatBadgeModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatBadgeModule,
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
