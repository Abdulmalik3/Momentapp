import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataHelperService } from 'src/app/shared/data-helper.service';
import { iNotification } from 'src/app/shared/models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notificationList

  constructor(public dataHelper: DataHelperService,
              private apiService: ApiService) {
  }

  async ngOnInit() {

    this.notificationList = await this.apiService.getAllUserNotifications()
    
  }

}
