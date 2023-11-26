import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DataHelperService } from 'src/app/shared/data-helper.service';
import { iPost } from 'src/app/shared/models';
@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.page.html',
  styleUrls: ['./friend-profile.page.scss'],
})
export class FriendProfilePage implements OnInit {

  @ViewChild('popover') popover: any;
  allPosts
  friendProfile = JSON.parse(localStorage.getItem('myFriend'))
  postCount
  isOpen = false;
  friendId

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private dataHelper: DataHelperService,
    private ApiService: ApiService,
    private actRoute: ActivatedRoute
  ) {

  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Add Friend",
          icon: "person-add-outline",
          cssClass: "dark",
          handler: () => { }
        }
        , {
          text: 'Remove Friend',
          icon: 'person-remove-outline',
          cssClass: "dark",
          handler: () => { }
        },
        {
          text: 'Block',
          icon: "close-circle-outline",
          cssClass: "dark",
          handler: () => { }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  async ngOnInit() {
    this.actRoute.queryParams.subscribe(parms => {
      console.log("url parms", parms)
      this.friendId = parms['friendId']
 
    })
    console.log(this.friendProfile)
    this.allPosts = await this.ApiService.getPost(this.friendProfile.id) || []
    this.postCount = this.allPosts.length
    console.log("count",this.allPosts.length)


  }

}