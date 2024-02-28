import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IonContent, IonModal, ModalController, isPlatform } from '@ionic/angular';
import { PostPage } from '../pages/post/post.page';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('popover') popover: any;
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonContent) content: IonContent;



  showNightPost: boolean;
  profile
  isOpen = false;
  allPosts
  userId
  newNotification = 'false'
  range = 11
  scrollTo 


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
        let isThereNewFriend = localStorage.getItem('newFriend')
        if(isThereNewFriend === 'true'){
          this.updateFeeds()

          this.connectTorealtime()
          localStorage.setItem('newFriend','false')

        }
      }})
      setInterval(() => {
        this.checkForNewPost();
        this.apiService.checkNontifications()
        this.newNotification = localStorage.getItem('newNotifications')

      }, 10000)
    
    }
   
   handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
    }, 1000);
  }

  async checkForNewPost() {
    let lastPost = this.allPosts[0];
    let newPost = await this.apiService.supabase
      .from("posts")
      .select("*, profiles(id,full_name, avatar_url),comments:first_comment(*)")
      .gt("id", lastPost.id)


    if (newPost.data != null) {
      this.allPosts.unshift(...newPost.data)
    }
    console.log("new posts updated", newPost);
  }

  // Repeat the checkForNewPost function every 5 seconds



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
      // if(payload.eventType == "INSERT"){
      
      //   let scrollPosition;
      //   this.content.getScrollElement().then(scrollElement => {
      //     scrollPosition = scrollElement.scrollTop;
      //   });

      //   // Save old max scroll height
      //   let oldScrollHeight = (await this.content.getScrollElement()).scrollHeight
      //   console.log("oldScrollHeight",oldScrollHeight)
      //  let newpost = await this.apiService.supabase.from("posts")
      //  .select("*, profiles(id,full_name, avatar_url),comments:first_comment(*)")
      //  .eq("id",newdata['id'])
      //  .single()
        
      //  console.log("new post from database :", newpost.data)
      //  this.allPosts.unshift(newpost.data)

      //  let newScrollHeight = (await this.content.getScrollElement()).scrollHeight
      //  console.log("oldScrollHeight",newScrollHeight)
      //  console.log("new allPost:", this.allPosts)
      //   // Set new scroll position
      //   this.scrollTo = (newScrollHeight - oldScrollHeight) + scrollPosition;


      // }
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

async loadData($event){
  let olderPosts = await this.apiService.getFeed(this.range)

  console.log("olderPosts",olderPosts)
  
  this.allPosts = this.allPosts.concat(olderPosts)
  console.log("allPosts",this.allPosts)
  setTimeout(() => {
    this.range += 10
    $event.target.complete();
  }, 1000);

}





}

