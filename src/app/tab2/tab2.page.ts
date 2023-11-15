import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  friendList
  activeTab = "friendList"
  friendshipRequest
  searchinput

  constructor(private apiService: ApiService) {

   }

   async ngOnInit() {


    this.friendshipRequest = await this.apiService.bringFriendshipRequests()
}

async bring(){
  let data = await  this.apiService.bringMemebers()
  console.log("ever member data: ", data)
  this.friendList = data
}
async addFriend(id){
  console.log("Friend id", id)
  const addFriend = await this.apiService.addFriend(id)
}

async acceptFriend(id,senderId,recieverdId){
  const data = await this.apiService.acceptFriendship(id,senderId,recieverdId)
  const index = this.friendshipRequest.findIndex(item => item.id === id);
        
      
  if (index !== -1) {
    let deletePost = await this.apiService.supabase.from("friendrequest")
 .delete()
 .eq("id",id)
    if (!deletePost){return false}
    // Update the specific object in your local array with the new data
    let x = this.friendshipRequest.splice(index,0)
    this.friendshipRequest = x
    this.activeTab = "FriendsRequest"
    this.ngOnInit()

    // You can also trigger any UI updates or other logic here
  }
}
  async searchOnChange(event){
    if(this.searchinput.length < 3) return false

    let data = await this.apiService.searchForFriends(this.searchinput)
    if(data.length >= 1 ){
      this.friendList = data
    }else{
      this.friendList = []
    }
  }
  

}
