import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsWithpostPageRoutingModule } from './comments-withpost-routing.module';

import { CommentsWithpostPage } from './comments-withpost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsWithpostPageRoutingModule
  ],
  declarations: [CommentsWithpostPage]
})
export class CommentsWithpostPageModule {}
