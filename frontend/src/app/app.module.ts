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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRipple } from '@angular/material/core';

import { RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChartsComponent, JSONUploadDialog, NodeDetailDialog } from './components/charts/charts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

import { OrgchartModule } from './modules/orgchart/orgchart.module';
import { TestComponent } from './components/test/test.component';
import { NodeDetailComponent } from './components/node-detail/node-detail.component';
import { TransferRequestComponent } from './components/transfer-request/transfer-request.component';

import { TransferRequestDialog } from './components/node-detail/node-detail.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TransferConfirmComponent } from './components/transfer-confirm/transfer-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChartsComponent,
    NotFoundComponent,
    FileUploadComponent,
    JSONUploadDialog,
    NodeDetailDialog,
    TransferRequestDialog,
    TestComponent,
    NodeDetailComponent,
    TransferRequestComponent,
    TransferConfirmComponent,
  ],
  imports: [
    BrowserModule,
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
    OrgchartModule,
    DragDropModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'test',
        component: TestComponent
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
