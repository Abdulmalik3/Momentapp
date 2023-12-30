import { Component, OnInit } from '@angular/core';
import { DataHelperService } from 'src/app/shared/data-helper.service';
@Component({
  selector: 'app-night-post',
  templateUrl: './night-post.page.html',
  styleUrls: ['./night-post.page.scss'],
})
export class NightPostPage implements OnInit {

  nightPosts: string[] = [];

  constructor(
    public dataHelper: DataHelperService
  ) {
    this.nightPosts = this.dataHelper.nightPosts
  }

  showPhotoViewer() {
    let Options = {
      share: true,
      closeButton: true,
      copyToReference: true,
      headers: '',
      piccasoOptions: {}
    }
  }

  ngOnInit() {
  }

}
