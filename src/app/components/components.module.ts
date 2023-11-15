import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SocialPostComponent } from './social-post/social-post.component';

@NgModule({
  declarations: [
    SocialPostComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
  ],
  exports: [
    SocialPostComponent
  ]
})
export class ComponentsModule { }
