import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NightPostPage } from './night-post.page';

const routes: Routes = [
  {
    path: '',
    component: NightPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NightPostPageRoutingModule {}
