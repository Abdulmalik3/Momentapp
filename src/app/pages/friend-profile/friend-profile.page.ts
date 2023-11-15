import { Component, OnInit, ViewChild } from '@angular/core';
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
  friendProfile

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private dataHelper: DataHelperService,
    private ApiService: ApiService
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
    let userId = await localStorage.getItem('myFrindId')
    this.friendProfile = await this.ApiService.getUserProfileById(userId)
    this.allPosts = await this.ApiService.getPost(userId)
    
    console.log(this.friendProfile)

  }

}