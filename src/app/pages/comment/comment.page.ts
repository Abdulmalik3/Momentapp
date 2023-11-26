import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  presentingElement
  comment
  postId
  commentList
  notifyerId 
  profile
  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    this.commentList = await this.apiService.getComments(this.postId)
    console.log(this.commentList)

    this.profile = this.apiService.profile

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

  

}
