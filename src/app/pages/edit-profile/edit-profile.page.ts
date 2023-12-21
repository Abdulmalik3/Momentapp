import { Component, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType } from '@capacitor/camera'




@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profile
  name: string = this.apiService.profile.full_name
  dob: Date =this.apiService.profile.dob
  gender: string= this.apiService.profile.gender
  bio: string = this.apiService.profile.bio
  randomDate = ''




  constructor(public alertController: AlertController,
    private apiService: ApiService) {
      this.profile =  this.apiService.profileobject;
     }

  async OpenGallery() {
    const alert = await this.alertController.create({
      header: 'Add Photo',
      buttons: [
        {
          text: 'Camera',
          cssClass: 'danger',
          handler: () => { },
        },
        {
          text: 'Gallery',
          cssClass: 'danger',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
    this.randomDate = Date.now().toString()
  }

  async uploadAvatar(){
  const loader = await this.apiService.createLoader()
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      
    })

    const file = await fetch(photo.dataUrl)
      .then((res) => res.blob())
      .then((blob) => new File([blob], 'my-file', { type: `image/JPEG` }))
    const fileName = this.apiService.profile.id 

    await loader.present()

    let uplodedphoto = await this.apiService.uploadAvatar(fileName, file)
    console.log(uplodedphoto)


  } catch (error) {
    this.apiService.showAlert("Uploading error",error.message)
  } finally {

    await loader.dismiss()
    this.ngOnInit()
  }
}
updateProfile(){
  
  let data = {
    full_name: this.name,
    dob: this.dob,
    gender: this.gender,
    bio: this.bio
  }
  this.apiService.updateProfile(data)

}


}




