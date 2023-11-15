import { Component, OnInit } from '@angular/core';
import { DataHelperService } from 'src/app/shared/data-helper.service';
import { iNotification } from 'src/app/shared/models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notificationList: iNotification[] = []

  constructor(public dataHelper: DataHelperService) {
    this.notificationList = this.dataHelper.notificationList;
  }

  ngOnInit() {
  }

}
