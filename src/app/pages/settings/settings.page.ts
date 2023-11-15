import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  showDeleteAccountConfirmation: boolean;
  profile

  constructor(
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public navCtrl: NavController,
    private apiService: ApiService
  ) { }

  async openActionSheet() {
    const currentLanguage = localStorage.getItem('language');
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an option',
      buttons: [{
        text: 'English',
        icon: (currentLanguage === 'en') ? 'checkmark-circle' : 'checkmark-circle-outline',
        cssClass: (currentLanguage === 'en') ? 'danger' : '',
        handler: () => { }
      }, {
        text: 'Arabic',
        icon: (currentLanguage === 'ar') ? 'checkmark-circle' : 'checkmark-circle-outline',
        cssClass: (currentLanguage === 'ar') ? "danger" : '',
        handler: () => { }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  async logoutAlert() {
    const alert = await this.alertController.create({
      header: 'Logout Account',
      message: 'Are you sure you want to logout your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => { },
        },
        {
          text: 'Confirm',
          cssClass: 'danger',
          role: 'confirm',
          handler: () => {
            this.logout();
          },
        },
      ],
    });
    await alert.present();
  }

  
  async ngOnInit() {

    this.profile = this.apiService.profileobject
    console.log('setting', )

  }
  async logout() {
    await this.apiService.signOut()
   }

}