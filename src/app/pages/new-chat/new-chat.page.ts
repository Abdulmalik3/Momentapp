import { Component, OnInit } from '@angular/core';
import { DataHelperService } from 'src/app/shared/data-helper.service';
import { iAvailableFriendsForChat } from 'src/app/shared/models';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit {

  availableFriend: iAvailableFriendsForChat[] = []

  constructor(public dataHelper: DataHelperService) {
    this.availableFriend = this.dataHelper.availableFrieindsForChat
  }

  ngOnInit() {
  }

}
