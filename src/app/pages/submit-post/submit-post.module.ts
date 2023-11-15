import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitPostPageRoutingModule } from './submit-post-routing.module';

import { SubmitPostPage } from './submit-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitPostPageRoutingModule
  ],
  declarations: [SubmitPostPage]
})
export class SubmitPostPageModule {}
