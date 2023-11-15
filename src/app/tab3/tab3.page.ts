import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataHelperService ,Reactions} from '../shared/data-helper.service';
import { iPost } from '../shared/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  isOpen = false;
  allPosts: any;
  profile: any;
  friendsCount = this.apiService.profile.friends.length -1 | 0

  reactions: string[] = [
    '../../../assets/images/in-love.png',
    '../../../assets/images/love.png',
    '../../../assets/images/like.png',
    '../../../assets/images/dislike.png',
    '../../../assets/images/laughing.png',
    '../../../assets/images/sad.png'
  ];

  @ViewChild('popover') popover: any;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  constructor(
    public alertController: AlertController,
    private dataHelper: DataHelperService,
    private apiService: ApiService,
    private navCtrl: NavController
  ) {
    this.allPosts = this.dataHelper.allPosts;
    this.profile =  this.apiService.profile;
    
  }

  async OpenGallery() {
    const alert = await this.alertController.create({
      header: 'Add Photo',
      buttons: [
        {
          text: 'Camera',
          cssClass: 'danger',
          handler: () => {

          },
        },
        {
          text: 'Gallery',
          cssClass: 'danger',
          handler: () => {
          },
        },
      ],
    });
    await alert.present();
  }

  async ngOnInit() {

    this.allPosts = await this.apiService.getPost(this.profile.id);

    this.profile = await this.apiService.profile;
  }
  getReactionIcon(reaction: string): string {
    return Reactions[reaction];
  }

  toggleReactionsPopup(post: iPost): void {
    this.dataHelper.allPosts.forEach(x => {
      if (x.postId !== post.postId) {
        x.showRections = false;
      }
    });
    post.showRections = !post.showRections;
  }

  openComments(): void {
    this.navCtrl.navigateForward(['/comment']);
  }

  getClickElement(e: any, post: iPost): void {
    if (e.target.id === 'reactionsContainer') {
      this.toggleReactionsPopup(post);
    }
  }

}
