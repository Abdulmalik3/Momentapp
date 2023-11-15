import { Component, OnInit } from '@angular/core';
import { DataHelperService } from 'src/app/shared/data-helper.service';
import { iChat } from 'src/app/shared/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chatList: iChat[] = [];

  constructor(public dataHelper: DataHelperService) {
    this.chatList = this.dataHelper.chatList;
  }

  ngOnInit() {
  }

}
