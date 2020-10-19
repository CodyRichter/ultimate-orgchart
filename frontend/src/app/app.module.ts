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

import { RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChartsComponent, JSONUploadDialog, EmployeeTransferDialog } from './components/charts/charts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthInterceptorService } from "./services/auth/auth-interceptor.service";
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { EmployeeTransferComponent } from './components/employee-transfer/employee-transfer/employee-transfer.component';
import { TransferRequestComponent } from './dialogs/transfer-request/transfer-request.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChartsComponent,
    NotFoundComponent,
    FileUploadComponent,
    JSONUploadDialog,
    EmployeeTransferDialog,
    EmployeeTransferComponent,
    TransferRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
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
    ReactiveFormsModule,
    FormsModule
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
