import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType } from '@capacitor/camera'


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  profile 
  caption: string
  postPhoto
  postPhotoUrl
  

  constructor(private apiService: ApiService,
    private navCtrl: NavController,
    private modalCrt: ModalController) {
   }

   async savePost(){
    await this.uploadPostImage()
      console.log(this.caption)

      var data = {
        caption: this.caption,
        authorId: this.profile.id,
        sleep: false,
        wakeup: false,
        reactions: [],
        img: this.postPhotoUrl
      }

      await this.apiService.savePost(data);
      this.modalCrt.dismiss()

    }

  async ngOnInit() {
    this.profile = this.apiService.profile

  }

  async bringImgToView(){
    try {
      this.postPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        allowEditing: true

        
      })
  }catch(err){
    console.log(err)

  }

}

  async uploadPostImage(){
    const loader = await this.apiService.createLoader()
    try {
      const file = await fetch(this.postPhoto.dataUrl)
        .then((res) =>
        res.blob())
        .then((blob) => new File([blob], 'my-file', { type: `image/JPEG` }))
      const fileName = this.apiService.profile.id
  
      await loader.present()
      this.postPhotoUrl = await this.apiService.uploadPostImg(fileName, file)
      console.log(this.postPhoto)
  
  
    } catch (error) {
      this.apiService.showAlert("Uploading error",error.message)
    } finally {
  
      await loader.dismiss()
    }
  }


}
