import { Component, ViewChild } from '@angular/core';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { DataHelperService } from '../shared/data-helper.service';
import { iPost } from '../shared/models';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IonModal } from '@ionic/angular';


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
    private dataHelper: DataHelperService,
    public photo: PhotoViewer,
    private apiService: ApiService,
    private router: Router,
     private route: ActivatedRoute
  ) {
    //this.allPosts = this.apiService.getPosts()
    apiService.getUserProfile()
    this.profile = this.apiService.profile
    this.updateFeeds()
    this.userId = this.profile.id
    
  }

  async ngOnInit() {
    this.newNotification = await localStorage.getItem('newNotifications')

    this.connectTorealtime()
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if the navigation is to the desired tab (e.g., '/tab1')
      console.log("router:",event.urlAfterRedirects)
      if (event.urlAfterRedirects === '/tabs/tab1') {
         this.apiService.getUserProfile()
        // Call your function here
        this.updateFeeds()
        this.apiService.checkNontifications()
        this.connectTorealtime();
        this.newNotification = localStorage.getItem('newNotifications')
      }
    });


   }
   
   handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
    }, 2000);
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
  
    // Bring friend's ids from the friends column in the profiles table
    const { data: profile, error: profilesError } = await this.apiService.supabase
      .from('profiles')
      .select('friends')
      .eq('id', user.data.user.id)
      .single();

    console.log("this.profile['friends']::: ", profile['friends'].toString())
    this.apiService.supabase.channel('schema-db-changes').on('postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: "posts",
      filter: 'authorId=in.('+profile['friends'].toString()+')'
      
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
  

}
