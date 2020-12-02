import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationModel } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private readonly httpClient: HttpClient) { }

  async getNotifications(employeeId: number): Promise<NotificationModel[]> {
    return await this.httpClient.get(environment.SERVER_URL + 'notification/employee/' + employeeId + "?dismissed=false").toPromise() as NotificationModel[];
  }

  async dismissNotification(notificationId: number): Promise<NotificationModel> {
    return await this.httpClient.patch(environment.SERVER_URL + 'notification/dismiss/' + notificationId, {}).toPromise() as NotificationModel;
  }
}
