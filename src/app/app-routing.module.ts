import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'chat-screen',
    loadChildren: () => import('./pages/chat-screen/chat-screen.module').then(m => m.ChatScreenPageModule)
  },
  {
    path: 'comment',
    loadChildren: () => import('./pages/comment/comment.module').then(m => m.CommentPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./credentials/login/login.module').then(m => m.LoginPageModule),

  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./credentials/splash-screen/splash-screen.module').then(m => m.SplashScreenPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./credentials/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./pages/post/post.module').then(m => m.PostPageModule)
  },
  {
    path: 'new-chat',
    loadChildren: () => import('./pages/new-chat/new-chat.module').then( m => m.NewChatPageModule)
  },
  {
    path: 'night-post',
    loadChildren: () => import('./pages/night-post/night-post.module').then( m => m.NightPostPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'submit-post',
    loadChildren: () => import('./pages/submit-post/submit-post.module').then( m => m.SubmitPostPageModule)
  },
  {
    path: 'my-friends',
    loadChildren: () => import('./pages/my-friends/my-friends.module').then( m => m.MyFriendsPageModule)
  },
  {
    path: 'friend-profile',
    loadChildren: () => import('./pages/friend-profile/friend-profile.module').then( m => m.FriendProfilePageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
