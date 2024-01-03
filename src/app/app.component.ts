import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private apiService: ApiService) {
    apiService.loadUser()
  }
  async ngOnInit(){
    await this.apiService.getUserProfile()
    defineCustomElements(window);



  }
  
}
