import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataHelperService } from 'src/app/shared/data-helper.service';
import { iChat } from 'src/app/shared/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chatList
  profile = this.apiService.profile
  chatConnection

  constructor(private apiService: ApiService,
    private router: Router) {

  }

  async ngOnInit() {
    await this.apiService.getUserConversations(this.profile.id)
    this.chatList = await this.apiService.conversations
    this.connectToRealtimeMessages()
  }

  async navigateToChat(id,fid1,fid2){
    let friendid
    if(fid1 !== this.profile.id){
      await localStorage.setItem('myFriend', JSON.stringify(this.chatList[id].user1))
    }else{
      await localStorage.setItem('myFriend', JSON.stringify(this.chatList[id].user2))    }

    this.router.navigateByUrl(`/chat-screen?chat=${id}&convId=${this.chatList[id].conversation_id}&friendId=${friendid}`)
  }

  myConversationsId = []

  async connectToRealtimeMessages(){
    console.log("Connecting to Messages")

    this.chatList.forEach(element => {
      this.myConversationsId.push(element.conversation_id)
      console.log("Conversation Ides:", element.conversation_id)

    });

      console.log("Conversation Ides:", this.myConversationsId.toString())

     let connection =  this.apiService.supabase.channel('chat-connection').on('postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: "messages",
        filter: 'conversation_id=in.('+this.myConversationsId.toString()+')'
        
      },
      
      async (payload) => {
        console.log("Payload in realtime",payload )
        const newdata  = payload.new
        if(payload.eventType == "INSERT"){

          const index = this.apiService.conversations.findIndex(conversation => conversation.conversation_id === newdata['conversation_id']);
          if(index === -1){
            let newCon = await this.apiService.supabase.from('conversation').select(`*,
            user1:participant_creator(*),
            user2:participant_other(*)`)
            .eq("conversation_id", newdata['conversation_id']).single()
            console.log("new conversation to be add", newCon)

            this.apiService.conversations.unshift(newCon)
            this.chatList.unshift(newCon)
          }
          this.apiService.conversations[index]['messages'].push(newdata)
  
        }
        if (payload.eventType === "UPDATE") {
          console.log("update")

  }
}).subscribe(d=>{ console.log("Chat is connected")})

this.apiService.chatConnection = connection


}




}


