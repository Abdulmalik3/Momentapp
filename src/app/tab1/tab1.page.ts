import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IonModal, ModalController, isPlatform } from '@ionic/angular';
import { PostPage } from '../pages/post/post.page';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('popover') popover: any;
  @ViewChild(IonModal) modal: IonModal;


  showNightPost: boolean;
  profile
  isOpen = false;
  allPosts
  userId
  newNotification = 'false'


  constructor(
    private apiService: ApiService,
    private router: Router,
     private  modalCtrl: ModalController
  ) {
    //this.allPosts = this.apiService.getPosts()
    apiService.getUserProfile()
    this.profile = this.apiService.profile
    this.userId = this.profile.id

    
  }

  async ngOnInit() {
    this.newNotification = await localStorage.getItem('newNotifications')
    this.apiService.getUserProfile()
    this.profile = this.apiService.profile
    this.updateFeeds()
    this.connectTorealtime()

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if the navigation is to the desired tab (e.g., '/tab1')
      console.log("router:",event.urlAfterRedirects)
      if (event.urlAfterRedirects === '/tabs/tab1') {
        // Call your function here
        this.apiService.checkNontifications()
        this.newNotification = localStorage.getItem('newNotifications')
        let isThereNewFriend = localStorage.getItem('newFriend')
        if(isThereNewFriend === 'true'){
          this.updateFeeds()

          this.connectTorealtime()
          localStorage.setItem('newFriend','false')

        }
      }else{
        this.apiService.checkNontifications()
      }
    });


   }
   
   handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
    }, 1000);
  }


  async saveSleepPost(){


    var data = {
    
      authorId: this.profile.id,
      sleep: true,

      reactions: []
    }

    await this.apiService.savePost(data);
    this.isOpen = false
  }

   updateFeeds(){

    this.apiService.getFeed().then(data=> this.allPosts = data)
    
  }
  
  async connectTorealtime(){

    const user = await this.apiService.supabase.auth.getUser();
    console.log("this.profile['friends']::: ", this.profile['friends'].toString())
    this.apiService.supabase.channel('schema-db-changes').on('postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: "posts",
      filter: 'authorId=in.('+this.profile['friends'].toString()+')'
      
    },
    async (payload) => {
    
      console.log("Payload in realtime",payload )
      const newdata  = payload.new
      if(payload.eventType == "INSERT"){

       let newpost = await this.apiService.supabase.from("posts")
       .select("*, profiles(id,full_name, avatar_url),comments:first_comment(*)")
       .eq("id",newdata['id'])
       .single()

       console.log("new post from database :", newpost.data)
       this.allPosts.unshift(newpost.data)
       console.log("new allPost:", this.allPosts)

      }
      if (payload.eventType === "UPDATE") {
        const updatedPostId = payload.new['id'];
      
        // Find the index of the object to be updated in your local array
        const index = this.allPosts.findIndex(post => post.id === updatedPostId);
        
      
        if (index !== -1) {
          let updatedPost = await this.apiService.supabase.from("posts")
          this.allPosts[index]['reactions'] =  payload.new['reactions'];
          if(payload.new['first_comment'] != null){
            let firstComment = await this.apiService.supabase.from("comments")
              .select("content,profiles(full_name)")
              .eq("id",payload.new['first_comment'])
              .single()
              this.allPosts[index]['comments'] = firstComment.data
          }
        
          console.log("updated post from database :", newdata, this.allPosts)

      
          // You can also trigger any UI updates or other logic here
        }
      }
      if (payload.eventType === "DELETE") {
        console.log("Post deleted ", payload)
        const index = this.allPosts.findIndex(post => post.id === payload.old['id']);
        this.allPosts.splice(index,1)

    }
  }
  ).subscribe(res=>{
    console.log(res)
  })

  }
  async openModal(){
   
    this.isOpen = true
    //if(this.profile.friends.includes)

  }
  isOpentoFalse(e){
    this.isOpen = false

  
  }

  async openPostModal() {

    const modal = await this.modalCtrl.create({
      breakpoints: [0.5, 0.5, 0.5, 1],
      initialBreakpoint: 0.8,
      component: PostPage,
      
      
    });
    modal.present()
  

}





}

