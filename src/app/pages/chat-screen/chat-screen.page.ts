import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.page.html',
  styleUrls: ['./chat-screen.page.scss'],
})
export class ChatScreenPage implements OnInit {
  chat 
  profile = this.apiService.profile
  friendId
  content
  convId: any;
  friendData = JSON.parse(localStorage.getItem('myFriend'))

  @ViewChild(IonContent, { static: false }) contentt: IonContent;

  constructor(private apiService: ApiService,
    private actRoute: ActivatedRoute) { 
    this.actRoute.queryParams.subscribe(parms => {
      console.log("url parms", parms)
      if (parms['chat']){this.chat = apiService.conversations[parms['chat']]}
      if(parms['friendId']){this.friendId = parms['friendId']}
      if(parms['convId']){this.convId = parms['convId']}

      
      console.log("friendId= " ,this.friendId)

      
    })
  }

  async ngOnInit(){
 

  }
  
  ionViewWillEnter(){
    this.contentt.scrollToBottom()
  }

  async sendMessage(){
    let newConv

    if(!this.chat){
      newConv = await this.apiService.startNewConversation(this.friendId)
      this.chat = newConv
      console.log("newConv", newConv[0])
      this.convId = newConv[0].conversation_id
      await this.apiService.getUserConversations(this.profile.id)
      this.apiService.chatConnection.send({ type: "UPDATE"})
    }

    
    let message= {
      content: this.content,
      sender_id: this.profile.id,
      conversation_id: this.convId
    }
    let newMsg = await this.apiService.sendNewMessage(message)
    console.log(newMsg)

  }

  
}
