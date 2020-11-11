import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private readonly httpClient: HttpClient) { }

  async getNotifications(employeeId: number): Promise<NotificationModel[]> {
    return await this.httpClient.get('http://localhost:3000/notification/employee/' + employeeId + "?dismissed=false").toPromise() as NotificationModel[];
  }

  async dismissNotification(notificationId: number): Promise<NotificationModel> {
    return await this.httpClient.patch('http://localhost:3000/notification/dismiss/' + notificationId, {}).toPromise() as NotificationModel;
  }
}
