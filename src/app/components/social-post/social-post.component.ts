import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonModal, ModalController, NavController } from '@ionic/angular';
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
  @ViewChild('popover2') popover2: any;
  @ViewChild(IonModal) modal: IonModal;


  profile: any;
 @Input() posts
 @Input() myId
 isOpen = false
 showUserProfile
 FriendData



 

  reactions= [
    ['../../../assets/images/in-love.png','love',6],
    ['../../../assets/images/love.png','love2',6],
    ['../../../assets/images/like.png','likes',7],
    ['../../../assets/images/dislike.png','dislike',8],
    ['../../../assets/images/laughing.png', 'laugh',5],
    ['../../../assets/images/sad.png','sad',9]
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
    console.log('myId',this.myId)  }

  getAvatarURL(id){
    return "http://qupalcyhiytufftknrzr.supabase.co/storage/v1/object/public/avatars/"+id
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
  async reactOnTisPost(postId,reactionType,typeId){

    await this.apiService.reactToPost(postId,reactionType,typeId)

  }
  async openCommentsModal(postId,notifyerId) {
    const modal = await this.modalCtrl.create({
      breakpoints: [0.5, 0.5, 0.5, 1],
      initialBreakpoint: 0.8,
      component: CommentPage,
      componentProps:{
        postId: postId,
        notifyerId: notifyerId
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



  isOpentoFalse(e){
    this.isOpen = false
    this.FriendData = []
  }

  async openModal(id){
    this.isOpen = true
    this.FriendData = await this.apiService.getUserProfileById(id)
    //if(this.profile.friends.includes)

  }

  timeAgo(value){
 
    if (!value) { return 'a long time ago'; }
    let time = (Date.now() - value) / 1000;
    if (time < 10) {
      return 'just now';
    } else if (time < 60) {
      return 'a moment ago';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' second', ' minute', ' hour', ' day', ' month', ' year'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';
    return Math.floor(time) + string[i] + plural + ' ago';

  }
  sleptFor(value){
 
    if (!value) { return 'a long time ago'; }
    let time = (Date.now() - value) / 1000;

     if (time < 60) {
      return 'less than a minute';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' second', ' minute', ' hour', ' day', ' month', ' year'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';
    return "Slept for " + Math.floor(time) + string[i] + plural ;

  }

  async visitFriend(friendData){

    //set localStorag 
    await localStorage.setItem('myFriend', JSON.stringify(friendData))
    this.modal.dismiss()
    this.FriendData = []
    this.navCtrl.navigateForward('/friend-profile')

  }

}



