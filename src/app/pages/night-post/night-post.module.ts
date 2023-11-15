import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NightPostPageRoutingModule } from './night-post-routing.module';

import { NightPostPage } from './night-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NightPostPageRoutingModule
  ],
  declarations: [NightPostPage]
})
export class NightPostPageModule {}
