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
    
      this.supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          this.currentUser.next(session.user)
          console.log("Event:" ,event)
          console.log("SET USER:" ,session)
        }else{

          this.currentUser.next(false)
        }})
        
        this.loadUser()
        this.getUserProfile()
        this.checkNontifications()


        this.members = this.bringMemebers().then(data=> {return data})
        console.log("Supabase constructor | members", this.members)

}

async loadUser() {
  if(this.currentUser.value){
    return;
  }

    const data = await this.supabase.auth.getUser();
    if(data.data.user){
      this.currentUser.next(data.data.user)
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
    var data2 = await this.supabase.from('profiles')
    .update([
      { full_name: name ,
       avatar_url: 'https://gcavocats.ca/wp-content/uploads/2018/09/man-avatar-icon-flat-vector-19152370-1.jpg' ,
       friends: [new_id] },
    ])
    .eq("id", new_id )
    .select()
    console.log("sing up data:", data2)

    

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
    this.router.navigateByUrl('/') 
    return data.user
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if (error) {
      console.log(error)
      return error
    }
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

  async getPost(id: string) {
    var data = await this.supabase
      .from('posts')
      .select('*, profiles(id,full_name, avatar_url)')
      .eq('authorId', id)
      .order('created_at', { ascending: true })
      
      console.log("posts by id:", data.data)

    return data.data
  }

 

  //get user's posts and friends posts and listen for changes

  async getFeed() {
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
      .select('*, profiles(id,full_name, avatar_url)')
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

  async saveComment(comment,notifyerId) {
    await this.loadCtr.create({
      message: 'Saving post...'
    }).then(loading => loading.present())

    const { data, error } = await this.supabase.
                            from('comments')
                            .insert(comment)
          if (!error){
            this.makeNotification(this.profile.id, comment.postId ,1,notifyerId)
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

  async acceptFriendship(frindshipId, senderIdui,receiverIdui) {
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


  //notifications

  async makeNotification(actorID, actedOn, typeId, notifyerId){
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
    console.log("notification",notification, error)
  }

  async getAllUserNotifications(conditions = ''){
    if(conditions === ''){
      let {data,error} = await this.supabase
      .from('notifications')
      .select('*,profiles(full_name,avatar_url)')
      .eq('notifyer_id',this.profile.id)
      .order('created_at', { ascending: false })
      .limit(12)






      if(error){
        console.log(error)
        return false
      }
      let lastNotification = data[data.length -1]['id']
      console.log(lastNotification)
      await localStorage.setItem('lastNotification', lastNotification)
      return data

    }
    
  }
    //need to be more efficient
  async checkNontifications(){
    let lastNotification = Number(await localStorage.getItem('lastNotification')) 
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


    console.log('last notification data ' ,data.data)

    if(data.data.length > 0 ){
      console.log('there is a new notification')
      await localStorage.setItem('newNotifications', 'true')
    }else{
      console.log('there is no new notification')
      await localStorage.setItem('newNotifications', 'false')
    }
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

}
