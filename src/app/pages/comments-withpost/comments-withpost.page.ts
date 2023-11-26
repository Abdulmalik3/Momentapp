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


  }
  async addComment(){
    let data = {
      content: this.comment,
      postId: this.postId
    }

    console.log(data)
    await this.apiService.saveComment(data,this.notifyerId)
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


}
