import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  profile 
  caption: string
  

  constructor(private apiService: ApiService,
    private navCtrl: NavController) {
    this.profile = this.apiService.profile
   }

   savePost(){
      console.log(this.caption)

      var data = {
        caption: this.caption,
        authorId: this.profile.id,
        sleep: false,
        wakeup: false,
        reactions: []
      }

      this.apiService.savePost(data);
      this.navCtrl.back()
    }

  ngOnInit() {
  }

}
