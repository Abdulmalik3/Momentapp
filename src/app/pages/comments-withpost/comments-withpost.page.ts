import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comments-withpost',
  templateUrl: './comments-withpost.page.html',
  styleUrls: ['./comments-withpost.page.scss'],
})
export class CommentsWithpostPage implements OnInit {
  presentingElement
  comment
  postId
  commentList
  notifyerId 
  profile
  firstLoad = true
  post

  constructor(private apiService: ApiService,
    private actRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.profile = this.apiService.profile
    this.actRoute.queryParams.subscribe(parms => {
      console.log("url parms", parms)
      this.postId = parms['postId']
 
    })
    this.post = await this.apiService.getOnePost(this.postId)
    console.log("post from comeents page", this.post)
    await this.getComment()
    console.log(this.commentList)
    this.notifyerId = this.post.authorId


  }
  async addComment(){
    let data = {
      content: this.comment,
      postId: this.postId
    }
    let firstComment = null
    if(this.post['first_comment'] != null){
      firstComment = true
    }
    console.log(data)
    await this.apiService.saveComment(data,this.notifyerId,firstComment)
    this.ngOnInit()
  }

  async getComment(){
    if(this.firstLoad){
      this.commentList =  JSON.parse( localStorage.getItem('comments'))
      this.firstLoad = false
    }else{
      this.commentList = await this.apiService.getComments(this.postId)
    }
}
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
  let time = value / 1000;
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


}
