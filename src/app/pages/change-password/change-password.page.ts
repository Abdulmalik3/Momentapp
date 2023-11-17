import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  password

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async changePassword(){
    let change = await this.apiService.updatePassword(this.password)

}
}