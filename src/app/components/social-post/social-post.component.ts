import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DataHelperService, Reactions } from 'src/app/shared/data-helper.service';
import { CommentsModalComponent } from '../comments-modal/comments-modal.component';
import { CommentPage } from 'src/app/pages/comment/comment.page';



@Component({
  selector: 'app-social-post',
  templateUrl: './social-post.component.html',
  styleUrls: ['./social-post.component.scss'],
})
export class SocialPostComponent implements OnInit {

  Reaction: boolean;
  @ViewChild('popover') popover: any;
 profile: any;
 @Input() posts
 @Input() myId

 

  reactions= [
    ['../../../assets/images/in-love.png','love'],
    ['../../../assets/images/love.png','love2'],
    ['../../../assets/images/like.png','likes'],
    ['../../../assets/images/dislike.png','dislike'],
    ['../../../assets/images/laughing.png', 'laugh'],
    ['../../../assets/images/sad.png','sad']
  ];

  constructor(
    public dataHelper: DataHelperService,
    public navCtrl: NavController,
    private apiService: ApiService,
    private modalCtrl: ModalController
  ) { 
    

    
  
  }

  ngOnInit() { 
    this.profile = this.apiService.profile
    console.log('myId',this.myId)
  }

  getReactionIcon(reaction: string): string {
    switch(reaction){
      case 'love':
      return "../../../assets/images/in-love.png"
      break
      case 'love2':
        return "../../../assets/images/love.png"
      break
      case 'like':
        return "../../../assets/images/like.png"
      break
      case 'dislike':
        return "../../../assets/images/dislike.png"
      break
      case 'laugh':
        return "../../../assets/images/laughing.png"
      break
      case 'sad':
        return "../../../assets/images/sad.png"
      break
    }
  }

  toggleReactionsPopup(post): void {
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

  getClickElement(e: any, post): void {
    if (e.target.id === 'reactionsContainer') {
      this.toggleReactionsPopup(post);
    }
  }

  updateFeeds(){
    this.posts = this.apiService.getFeed()
  }
  async reactOnTisPost(postId,reactionType){

    await this.apiService.reactToPost(postId,reactionType)

  }
  async openCommentsModal(postId) {
    const modal = await this.modalCtrl.create({
      breakpoints: [0.5, 0.5, 0.5, 1],
      initialBreakpoint: 0.8,
      component: CommentPage,
      componentProps:{
        postId: postId
      },
      cssClass: "modal-hight"
      
    });
    
    modal.present();
  }

  async saveWakeupPost(ddate){

    let postDate = new Date(ddate).getTime() 
    let wakeup = new Date().getTime() 
    let sleepingTime = wakeup - postDate
    
    var data = {
    
      authorId: this.profile.id,
      sleep: false,
      wakeup: sleepingTime,
      reactions: []
    }



    await this.apiService.savePost(data);
  }

}


