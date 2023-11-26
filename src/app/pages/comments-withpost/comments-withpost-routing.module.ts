import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentsWithpostPage } from './comments-withpost.page';

const routes: Routes = [
  {
    path: '',
    component: CommentsWithpostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentsWithpostPageRoutingModule {}
