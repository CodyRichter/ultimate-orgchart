import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { NotificationsService } from 'src/app/services/notifications.service';
import { NotificationModel } from 'src/app/models';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  notifications = [];

  ngOnInit(): void {
    this.getNotifications();
  }

  constructor(private router: Router,
              private readonly authService: AuthService,
              public readonly employeeService: EmployeeService,
              private dialog: MatDialog, private readonly projectService: ProjectService,
              private readonly notificationService: NotificationsService) {

    this.employeeService.initializeChart();

}

  async logout(): Promise<void> {
    this.authService.logout();
    this.router.navigateByUrl('/login').then();
  }

  async initializeChart(): Promise<void> {
    await this.employeeService.initializeChart();
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialog);
  }

  async openDialog(): Promise<void> {
    const currentVal = ( document.getElementById('mySearch') as HTMLInputElement).value;
    const result = await this.employeeService.searchEmployee(currentVal);
    this.dialog.open(SearchDialog, {
      data: {searchResult: result}
    });
  }

  async openProjectDialog(): Promise<void> {
    const projects = await this.projectService.getAllProjects();
    this.dialog.open(ProjectDetailComponent, {data: {project: projects[projects.length - 1]}});
  }

  async getNotifications(): Promise<NotificationModel[]> {
    this.notifications = await this.notificationService.getNotifications(this.authService.profile._id);
    return this.notifications;
  }
}


@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings-dialog.html',
})
export class SettingsDialog {}

@Component({
  selector: 'search-dialog',
  templateUrl: 'search-dialog.html',
})
export class SearchDialog {}
