import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SupabaseClient, createClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable, findIndex } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  supabase: SupabaseClient
  public currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject(
    null
    )
  profile = JSON.parse(localStorage.getItem('profile'))
  profileobject = JSON.parse(localStorage.getItem('profile'));
  members
  constructor(private router: Router,
    private loadCtr: LoadingController,
     private alertCtrl: AlertController,
     private loadingCtrl: LoadingController) { 
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
      )
      this.loadUser()
      this.supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          console.log("user data from session",session)
          this.currentUser.next(session.user)
          console.log("Event:" ,event)
          console.log("SET USER:" ,session)
        }else{
          if(!session){
          this.currentUser.next(false)
        }}})
        
        this.loadUser()
        this.checkNontifications()


}

async loadUser() {


    const data = await this.supabase.auth.getUser();
    if(data.data.user){
      this.currentUser.next(data.data.user)
      await this.getUserProfile()
      console.log("User:" ,data.data.user.id)
  }else{
    this.currentUser.next(false)
    console.log("User not set 2")

  }
  const user = await this.supabase.auth.getUser();
  if(user.data.user){
    this.currentUser.next(user.data.user)
}else{
  this.currentUser.next(false)
}
}

  async signUp(email: string, password: string, name: string) {
    const loading = await this.alertCtrl.create({
      message: 'Singing up...'
    })  
    await loading.present()
    var  { error, data } = await this.supabase.auth.signUp({
      email,
      password,
    })
   const new_id = (await this.supabase.auth.getUser()).data.user.id
    console.log("userId", new_id)
    await new Promise(f => setTimeout(f, 1500));
    await loading.dismiss()
    if (error) {
      this.showAlert('Sign up failed', error.message)
      console.log(error)
      return error
    }

    const { data: avt , error: avtError } = await this.supabase.storage
      .from('avatars')
      .copy('mainAvt', new_id)
    var data2 = await this.supabase.from('profiles')
    .update([
      { full_name: name ,
       avatar_url: 'https://qupalcyhiytufftknrzr.supabase.co/storage/v1/object/public/avatars/'+ new_id ,
       friends: [new_id] },
    ])
    .eq("id", new_id )
    .select()
    console.log("sing up data:", data2)

    this.router.navigateByUrl('/') 

    

  }

  async signIn(email: string, password: string) {
    const loading = await this.alertCtrl.create({
      message: 'Logging in...'
    })  
    await loading.present()
    const { error, data } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })
    await loading.dismiss()
    if (error) {
      this.showAlert('Login Failed', error.message)
      console.log(error)
      return error
    }
    await this.router.navigateByUrl('') 
    this.router.navigateByUrl('/tabs/tab1') 
    return data.user
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if (error) {
      console.log(error)
      return error
    }
     localStorage.clear()
    this.router.navigateByUrl('/', {replaceUrl: true})
  }
  //reset user's password
  async resetPassword(email: string) {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email)
    if (error) {
      console.log(error)
      return error
    }
  }
  //update user's password
  async updatePassword(newPassword: string) {

    const user = this.profile.id
    
    await this.loadCtr.create({
      message: 'Updating password...',
      duration: 3000

    }).then(loading => loading.present())

    const { error } = await this.supabase.auth.updateUser ( {password: newPassword})
    this.loadCtr.dismiss()
    if (error) {
      console.log(error)
      this.showAlert("Can't change password",error.message)
      return error
    }else{
      return true
    }


  }


    async updateProfile(data ){
      console.log("Update Profile", data)
       
      const { error } = await this.supabase
                .from('profiles')
                .update(data)
                .eq('id', this.profile.id)

      if (error) {
        this.showAlert('Update Failed', error.message)

    }
  }
 
  

  getCurrentUser(): Observable <User | boolean>{
    return this.currentUser.asObservable()

  }

  getCurrentUserId(): string {
    if(this.currentUser.value){
      return (this.currentUser.value as User).id;
    }else{
      return null
    }
  }







  async getUser() {
    const user = await this.supabase.auth.getUser()
    return user.data.user
  }

  async getUserProfile() {

    const id = (await this.supabase.auth.getUser()).data.user.id
    var data = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
      
   
    console.log("profile432:", data)
    await localStorage.setItem('profile',JSON.stringify( data.data))
    this.profile = JSON.parse(localStorage.getItem('profile'))



  }
  async getUserProfileById(id) {

 
    var data = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
  
   
    console.log("friends profile:", data.data)
    return data.data


  }

  //posts :

  async getOnePost(postId) {
    const { data, error } = await this.supabase.from('posts').select('*').eq('id',postId).single()
    if (error) {
      console.log(error)
      return error
    }
    console.log("posts: ",data)
    return data
  }

  async getPosts(id: string) {
    var data = await this.supabase
      .from('posts')
      .select('*, profiles(id,full_name, avatar_url),comments:first_comment(*,profiles:userId(*))')
      .eq('authorId', id)
      .order('created_at', { ascending: true })
      
      console.log("posts by id:", data.data)

    return data.data
  }

 

  //get user's posts and friends posts and listen for changes

  async getFeed(id = 1) {
    let friends
    if(this.profile){
      friends = this.profile.friends
    }else{
  
    // Bring friend's ids from the friends column in the profiles table
    const { data: profile, error: profilesError } = await this.supabase
      .from('profiles')
      .select('friends')
      .eq('id', this.profile.id)
      .single();
      friends = profile.friends
    if (profilesError) {
      console.log(profilesError);
      return profilesError;
    }}
    
  
    // Initialize data as an array
    let data: any[] = [];
  
    const { data: initialData, error } = await this.supabase
      .from('posts')
      .select('*, profiles(id,full_name, avatar_url),comments:first_comment(*,profiles:userId (*))')
      .in('authorId', friends)
      .order('created_at', { ascending: false })

  
    if (error) {
      console.log(error);
    }
  
    // Check if the data is an array or a single object, and convert to an array if needed
    if (initialData instanceof Array) {
      data = initialData;
    } else if (initialData) {
      data.push(initialData);
    }
    console.log(data);
  
    return data;
  }
  

  //save post

  async savePost(post) {
    post.created_at = Date.now()
    await this.loadCtr.create({
      message: 'Saving post...'
    }).then(loading => loading.present())

    const { data, error } = await this.supabase.
                            from('posts')
                            .insert(post)
    this.loadCtr.dismiss()

    if (error) {
      console.log(error)
      this.showAlert("Post not saved", error.message)
      return error
    }
    console.log("Post created successfully:", data)
    return data
  

  }

  async deletePost(id){

    try {
      let data = await this.supabase.from('posts').delete().eq('id', id)
      console.log(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  async reactToPost(postId, reaction, typeId){
    const user = this.profile;
    try{
      let { data: currentReactions, error } = await this.supabase
      .from('posts')
      .select('reactions,authorId')
      .eq("id", postId )
      .single();
      console.log("current reactions",currentReactions)
      let newData =  [this.profile.id, reaction]
      if(currentReactions['reactions'] != null){
      let index = currentReactions['reactions'].findIndex((innerArray)=> innerArray[0].includes(newData[0]))
      if(index === -1){
      currentReactions['reactions'].unshift(newData)
      console.log("new current reactions",currentReactions)
        }else{
        currentReactions['reactions'].splice(index,1)
        currentReactions['reactions'].unshift(newData)
      }}


      let { data, error: r } = await this.supabase.from('posts').update({reactions: currentReactions['reactions']}).eq('id', postId).select()
      console.log("data from reacting ",currentReactions ,r,error)
      await this.makeNotification(this.profile.id,postId,typeId, currentReactions['authorId'])
    }catch(error){
      console.log(error)
    }
  }

  async saveComment(comment,notifyerId ,firstComment) {
    await this.loadCtr.create({
      message: 'Saving comment...'
    }).then(loading => loading.present())
    comment.created_at = Date.now()


    const { data, error } = await this.supabase.
                            from('comments')
                            .insert(comment)
                            .select()

            console.log("Comment created successfully1:", data)
  
          if (!error){
            await this.makeNotification(this.profile.id, comment.postId ,1,notifyerId)
            
              if(data){

                console.log(" comment id= ",data[0]['id'])

                if(firstComment === null){
                  console.log("updating post...")
                let post1 = await this.supabase.from('posts').update({first_comment: data[0]['id']}).eq('id', comment.postId).select()
                console.log("updated post...", post1)
              }}
              
            
          }


    this.loadCtr.dismiss()

    if (error) {
      console.log(error)
      this.showAlert("Comment not saved", error.message)
      return error
    }
    console.log("Comment created successfully:", data)
    return data
  

  }

  async getComments(postId){
    const { data: initialData, error } = await this.supabase
    .from('comments')
    .select('*, profiles(id,full_name, avatar_url)')
    .eq('postId', postId)
    .order('created_at', { ascending: false })

    if(error){
      console.log("comments error:", error.message)
      return false
    }

    return initialData
  }


  //--- Friends

  async addFriend( friendId){
    const user = await this.supabase.auth.getUser();
    const { data, error } = await this.supabase
  .from('friendrequest')
  .insert([
    { senderId: user.data.user.id,
       recieverId: friendId}
    
  ])
  .select()

  if(error){
    console.log("addFriend:", error)
  }else{
    this.makeNotification(this.profile.id, "friend request",10,friendId)
  }

  }

  async acceptFriendship(frindshipId) {
    let { data: friendrequest, error } = await this.supabase
      .from('friendrequest')
      .select('*')
      .eq("id", frindshipId)
      .single();
    console.log('friendrequest', friendrequest);
  
    if (error) {
      console.log("acceptFriendship:", error);
      return false;
    }
  
    try {
      let senderFriends = await this.supabase.from('profiles').select('friends').eq('id', friendrequest['senderId']).single();
      let recieverFriends =await this.supabase.from('profiles').select('friends').eq('id', friendrequest['recieverId']).single();
      console.log("sender1",senderFriends.data['friends']);
      console.log("receiver1",recieverFriends.data['friends']);
      senderFriends.data['friends'].push(friendrequest['recieverId'])
      recieverFriends.data['friends'].push(friendrequest['senderId'])

      console.log("sender2",senderFriends.data['friends']);
      console.log("receiver2",recieverFriends.data['friends']);
      let data2,error2 = await this.supabase.from('profiles')
        .update({ friends: recieverFriends.data['friends'] })
        .eq('id', friendrequest['recieverId'])
        .select();
      console.log(data2);
  
      const { data, error }  = await this.supabase.from('profiles')
        .update({ friends: senderFriends.data['friends'] })
        .eq('id', friendrequest['senderId'])
        .select();

        console.log(error)
        await this.makeNotification(this.profile.id, "friend request",11,friendrequest['senderId'])

  
    } catch (error) {
      console.log("acceptFriendship", error);
    }
    this.getUserProfile()
  }
  
  async deleteFriend(friendId){
    let myFrinds
    let myFriendFrinds

    try {
      let index = this.profile.friends.findIndex((friend) => friend === friendId)
      let updateMyFriendsList = this.profile.friends
      updateMyFriendsList.splice(index,1)
      myFrinds = updateMyFriendsList
      console.log("my id:" ,this.profile.id)
      console.log("my friends id:" ,friendId)

      console.log("updated array: " ,updateMyFriendsList)
    } catch (error) {
      console.log("delete friend", error);
    }

    try {
    let data = await this.supabase.from('profiles').select('friends').eq('id',friendId).single()
    let updateMyFriendFrinds = data.data.friends
    let index2 = updateMyFriendFrinds.findIndex(friend => friend === this.profile.id)
    console.log(updateMyFriendFrinds)
    updateMyFriendFrinds.splice(index2,1)
    myFriendFrinds = updateMyFriendFrinds
    console.log(updateMyFriendFrinds)
    } catch (error) {
      console.log("delete friend", error);
    }
    try {
      //my friends
      const { data, error }  = await this.supabase.from('profiles')
        .update({ friends: myFrinds })
        .eq('id', this.profile.id)
        .select();
        const { data: data2, error: error2 }  = await this.supabase.from('profiles')
        .update({ friends: myFriendFrinds })
        .eq('id', friendId)
        .select();

    } catch (error) {
      console.log(error)
      
    }
    return true
  }

    
  

async bringMemebers(){
let { data: profiles, error } = await this.supabase
  .from('profiles')
  .select('*')

  return profiles
}

async searchForFriends(name){
  const { data, error } = await this.supabase.from('profiles').select("*").textSearch('full_name', `${name}`)
  console.log("found results:", data, error)
  return data
}

async bringFriendshipRequests(){
  const user = this.profile
  let { data: requests, error } = await this.supabase
    .from('friendrequest')
    .select(`*, profiles(*)`)
    .eq('recieverId', user.id )
    
  console.log("requests", requests)
  console.log("requests", error)
    return requests
  }

  async getFriends(friends){
    return (await this.supabase.from('profiles').select('id,full_name,avatar_url,friends,bio').in('id',friends)).data
  }
  
  async checkFriendshipRequests(myId,friendId){

    //added by me
    var {data , error} = await this.supabase.from("friendrequest").select("id").eq('senderId', myId).eq('recieverId', friendId)
    console.log(data , error)
    if(data.length > 0 ){
      return [1, data]
    }
    //to accept
    var data2 = await this.supabase.from("friendrequest").select("id").eq('senderId', friendId).eq('recieverId',  myId)
    if(data2.data.length > 0){
      return [2 ,data2.data[0]['id']]
    }
    // no requests
    return false
  }


  //notifications

  async makeNotification(actorID, actedOn, typeId, notifyerId){

    if(notifyerId === actorID){
      console.log('thats meee')
      return false
    }
    /*
    typeId: 
    1: commented on your post 
    2: mentioned you comment in his reply
    3: taged you in his post
    4: smile
    5: laughed
    6: loved
    7: liked
    8: disliked
    9: sad
    10: friendship Request
    11: Accepted friendship request
    */ 

    let notification = {
      actor_id: actorID,
      acted_on: actedOn,
      type_id: typeId,
      notifyer_id : notifyerId
    }

    let {data,error} = await this.supabase.from('notifications')
    .insert(notification)
    console.log("notification",notification, error, "n data: ", data)
  }

  async getAllUserNotifications(conditions = ''){
    if(conditions === ''){
      let {data,error} = await this.supabase
      .from('notifications')
      .select('*,profiles(full_name,avatar_url)')
      .eq('notifyer_id',this.profile.id)
      .limit(12)
      .order('id', { ascending: false })

      //.order('created_at', { ascending: true })

      if(error){
        console.log(error)
        return false
      }
      let lastNotification = data[0]['id']
      console.log(lastNotification)
      await localStorage.setItem('lastNotification', lastNotification)
      return data

    }
    
  }
    //need to be more efficient
  async checkNontifications(){
    let lastNotification = Number(await localStorage.getItem('lastNotification')) 
    let newNotification = await localStorage.getItem('newNotifications')

    if(newNotification === 'true'){
      return false
    }else{
    console.log('last notification id =' ,Number(lastNotification))
    if(!lastNotification){
      await localStorage.setItem('newNotifications', 'false')
      return false
    }

    let data = await this.supabase
    .from('notifications')
    .select('id')
    .eq('notifyer_id',this.profile.id)
    .gt('id', lastNotification)
    .order('created_at', { ascending: false })


    console.log('last notification data ' ,data.data)

    if(data.data.length > 0 ){
      console.log('there is a new notification', data.data)
      await localStorage.setItem('newNotifications', 'true')

      let lastNotification = data.data[data.data.length -1]['id']
      console.log("last notification from checkNontifications:",lastNotification)
      await localStorage.setItem('lastNotification', lastNotification)
    }else{
      console.log('there is no new notification')
      await localStorage.setItem('newNotifications', 'false')
    }}


  }


  


  showAlert(header: string, message: string) {
    this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    }).then(alert => alert.present())
  }
  
  createLoader() {
    return this.loadingCtrl.create()
  }

  async uploadAvatar(filePath: string, file: File) {
    
    const data = await this.supabase.storage.from('avatars').upload(filePath, file ,{cacheControl: '3',upsert: true})
    const url = await this.supabase.storage.from('avatars').getPublicUrl(this.profile.id)
    this.updateProfile({avatar_url: url.data.publicUrl})
    console.log(data.data)
    return data


  }

  async uploadPostImg(filePath: string, file: File) {
    let filePath2 = filePath+"/"+ this.randomString(25)
    const {data,error} = await this.supabase.storage.from('posts').upload(filePath2, file ,{cacheControl: '3',upsert: true})
    console.log(data,error)
    const url = await this.supabase.storage.from('posts').getPublicUrl(filePath2)
    return url.data.publicUrl


  }

   randomString(length) {
    let chars = "'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

}
