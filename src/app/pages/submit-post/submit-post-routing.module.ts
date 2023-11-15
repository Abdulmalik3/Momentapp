import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitPostPage } from './submit-post.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitPostPageRoutingModule {}
