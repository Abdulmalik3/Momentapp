import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DataHelperService } from 'src/app/shared/data-helper.service';
import { iFriend } from 'src/app/shared/models';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.page.html',
  styleUrls: ['./my-friends.page.scss'],
})
export class MyFriendsPage implements OnInit {

  friendList

  constructor(public dataHelper: DataHelperService,
    private apiService: ApiService,
    private navCtrl: NavController) {
    
  }

  async ngOnInit() {
     this.friendList = await this.apiService.getFriends(this.apiService.profile.friends)
     this.friendList.splice(0,1)
  }

  async moveToMyfriendsProfile(friendData){
    //set localStorag 
    await localStorage.setItem('myFriend', JSON.stringify(friendData))

    this.navCtrl.navigateForward('/friend-profile')
  }

}
