import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendProfilePageRoutingModule } from './friend-profile-routing.module';

import { FriendProfilePage } from './friend-profile.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    FriendProfilePageRoutingModule
  ],
  declarations: [FriendProfilePage]
})
export class FriendProfilePageModule { }
