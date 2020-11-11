import { Component, OnInit, Input } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { RequestStatus } from 'src/app/enums/request.enum';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ManagerService } from 'src/app/services/manager.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ManagerRequest, NotificationModel } from '../../models';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit {
  
  @Input() notification: NotificationModel;

  constructor(private readonly managerService: ManagerService, 
    public readonly authService: AuthService,
    private readonly notificationService: NotificationsService) { }

  async ngOnInit(): Promise<void> { 
    console.log(this.notification);
    await this.authService.getProfile();
  }

  async approveRequest() {
    this.dismiss();
    console.log(await this.managerService.approveRequest((this.notification.managerRequest as ManagerRequest)._id));
  }

  async rejectRequest() {
    this.dismiss();
    console.log(await this.managerService.rejectRequest((this.notification.managerRequest as ManagerRequest)._id));
  }

  async cancelRequest() {
    this.dismiss();
    console.log(await this.managerService.cancelRequest((this.notification.managerRequest as ManagerRequest)._id));
  }

  async dismiss() {
    this.notification = await this.notificationService.dismissNotification(this.notification._id);
  }
}
