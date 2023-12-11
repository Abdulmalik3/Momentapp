import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  profile =  this.apiService.profile
  presentingElement
  comment
  postId
  commentList
  notifyerId 
  firstComment
  constructor(private apiService: ApiService) { }

  async ngOnInit() {

    console.log("first comment",this.firstComment)


  }
  async addComment(){
    let data = {
      content: this.comment,
      postId: this.postId
    }

    console.log(data)
    if(!this.firstComment){
      this.firstComment = null
      console.log('no comments')
    }else{
      this.firstComment = true
      console.log('There is comments')
    }
    await this.apiService.saveComment(data,this.notifyerId, this.firstComment)
    this.commentList = await this.apiService.getComments(this.postId)
  }

  

}
