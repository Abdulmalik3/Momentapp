import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
              private apiService: ApiService,
              private router: NavController
              ) {
  }

  async ngOnInit() {

    this.notificationList = await this.apiService.getAllUserNotifications()
    
  }

  
  async navigateToTheActedOnActivity(typeId , actedOnId ,actorID ){
    let post = [1,2,3,4,5,6,7,8,9]
    if( post.includes(typeId) ){
      let commentList = await this.apiService.getComments(actedOnId)
      await localStorage.setItem('comments', JSON.stringify(commentList))
      this.router.navigateForward("/comments-withpost?postId="+actedOnId)

    }
    if(typeId === 9){
      this.router.navigateForward("/tab/tab2?activeTab=FriendsRequest")
    }
    if(typeId === 11){
      let friendData = await this.apiService.getUserProfileById(actorID)
      await localStorage.setItem('myFriend', JSON.stringify(friendData))
      this.router.navigateForward("/friend-profile")
    }
    


  }

}
