import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { setIntervalAsync } from 'set-interval-async/dynamic'
import { clearIntervalAsync } from 'set-interval-async'
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { NotificationsService } from 'src/app/services/notifications.service';
import { NotificationModel } from 'src/app/models';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  intervalId;
  notifs: NotificationModel[] = [];

  async ngOnInit(): Promise<void> {
    await this.authService.getProfile();
    await this.getNotifications();
    this.intervalId = setIntervalAsync(async () => { await this.getNotifications() }, 10000);
  }

  ngOnDestroy() {
    clearIntervalAsync(this.intervalId);
  }

  constructor(private router: Router,
    private readonly authService: AuthService,
    public readonly employeeService: EmployeeService,
    private dialog: MatDialog, private readonly projectService: ProjectService,
    private readonly searchService: SearchService,
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
    const currentVal = (document.getElementById('mySearch') as HTMLInputElement).value;
    const result = await this.searchService.searchGeneral(currentVal);
    this.dialog.open(SearchDialog, {
      data: { searchResult: result }
    });
  }

  async openProjectDialog(): Promise<void> {
    const projects = await this.projectService.getAllProjects();
    this.dialog.open(ProjectDetailComponent, { data: { project: projects[projects.length - 1] } });
  }

  async getNotifications(): Promise<NotificationModel[]> {
    this.notifs = await this.notificationService.getNotifications(this.authService.profile._id);
    return this.notifs;
  }
}


@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings-dialog.html',
})
export class SettingsDialog { }

@Component({
  selector: 'search-dialog',
  templateUrl: 'search-dialog.html',
})
export class SearchDialog { }
