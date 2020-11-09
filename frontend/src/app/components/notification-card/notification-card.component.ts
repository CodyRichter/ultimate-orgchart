import { Component, OnInit, Input } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit {
  @Input() type: string;
  @Input() id: number;
  @Input() employee: string;
  @Input() prevManager: string;
  @Input() destManager: string;
  @Input() status: string;

  visible: boolean = true;

  constructor(private readonly managerService: ManagerService) { }

  ngOnInit(): void { }

  isIncomingRequest(): boolean {
    return this.type == "incoming"
  }

  isOutgoingRequest(): boolean {
    return this.type == "outgoing"
  }

  async approveRequest() {
    this.dismissNotification();
    console.log(await this.managerService.approveRequest(this.id));
  }

  async rejectRequest() {
    this.dismissNotification();
    console.log(await this.managerService.rejectRequest(this.id));
  }

  dismissNotification(): void {
    this.visible = false;
  }

}
