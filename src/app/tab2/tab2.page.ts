import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  friendList = []
  activeTab = "friendList"
  friendshipRequest
  searchinput
  profile = this.apiService.profile

  constructor(private apiService: ApiService,
    private actRoute: ActivatedRoute) {
    this.actRoute.queryParams.subscribe(parms => {
      console.log("url parms", parms)
      this.activeTab = parms['activeTab']
 
    })
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
  const data = await this.apiService.acceptFriendship(id)
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
    this.apiService.getUserProfile()
    this.ngOnInit()

    // You can also trigger any UI updates or other logic here
  }
}
  async searchOnChange(event){
    if(this.searchinput.length < 3) return false

    let data = await this.apiService.searchForFriends(this.searchinput)
    if(data.length >= 1 ){
  
      
        for(let friend of data){
          if(friend['id'] === this.profile.id ){
            console.log('this is me!!')

          }else{
        let ff = await this.apiService.checkFriendshipRequests(this.apiService.profile.id, friend['id'])
        if(ff[0] === 1){
          friend['friendShipStatues'] = 1
        }else if( ff[0] === 2){
          friend['friendShipStatues'] = 2 
          friend['friendshipId'] = ff[1]
          console.log("friendship Id : " + friend['friendshipId'])

        }else{
          friend['friendShipStatues'] = 0
        }
        this.friendList.unshift(friend)
        console.log("check: " + ff)
      }}
      
    }else{
      this.friendList = []
    }
    console.log("friends",this.friendList)
  }
  
  async acceptFriendship(id){
    await this.apiService.acceptFriendship(id)
  }

}
