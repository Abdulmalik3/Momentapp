import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  activeTab = 'signin';
  loginForm = this.fb.nonNullable.group({
  email: ['', Validators.required],
  password: ['', Validators.required]

})
signupForm = this.fb.nonNullable.group({
  semail: ['', Validators.required],
  spassword: ['', Validators.required],
  cpassword: ['', Validators.required],
  name : ['', Validators.required]


})

  

  constructor(private apiService: ApiService,
    private fb: FormBuilder,
    private loadCtr: LoadingController,
    private alertCtrl: AlertController,
    private router: Router ) { 

      apiService.getCurrentUser().subscribe((user) => {
        if (user) {
          this.router.navigateByUrl('/tabs/tab1')
        }})}

    get email() {
      return this.loginForm.controls.email;
    }
    get semail() {
      return this.signupForm.controls.semail;
    }
    get password() {
      return this.loginForm.controls.password;
    }
    get spassword() {
      return this.signupForm.controls.spassword;
    }
    get cpassword() {
      return this.signupForm.controls.cpassword;
    }
    get name() {
      return this.signupForm.controls.name;
    }

  ngOnInit() {

  }

  async login() {

    const { email, password } = this.loginForm.value
    const data = await this.apiService.signIn(email, password)

}
  async signup() {
    const { semail, spassword , name} = this.signupForm.value
    console.log("name",name)
    const data = await this.apiService.signUp(semail, spassword, name)

  }
}


