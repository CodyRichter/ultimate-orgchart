import { Component, OnInit, Input } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ManagerService } from 'src/app/services/manager.service';
import { ManagerRequest, NotificationModel } from '../../models';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit {
  
  @Input() notification: NotificationModel;

  constructor(private readonly managerService: ManagerService, public readonly authService: AuthService) { }

  async ngOnInit(): Promise<void> { 
    await this.authService.getProfile();
  }

  async approveRequest() {
    this.dismissNotification();
    console.log(await this.managerService.approveRequest((this.notification.managerRequest as ManagerRequest)._id));
  }

  async rejectRequest() {
    this.dismissNotification();
    console.log(await this.managerService.rejectRequest((this.notification.managerRequest as ManagerRequest)._id));
  }

  dismissNotification(): void {
    //this.visible = false;
  }

}
