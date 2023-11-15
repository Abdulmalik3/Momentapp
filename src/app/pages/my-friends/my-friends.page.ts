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
    console.log(this.friendList,this.apiService.profile.id)
     const index = this.friendList.findIndex(friend => friend.id === this.apiService.profile.id);
        
      
     if (index !== -1) {
      this.friendList.splice(index,1)
  }else{
    console.log("something went worn at my-friend.page.ts")

  }

}

  async moveToMyfriendsProfile(friendData){
    //set localStorag 
    await localStorage.setItem('myFriend', JSON.stringify(friendData))

    this.navCtrl.navigateForward('/friend-profile')
  }

}
