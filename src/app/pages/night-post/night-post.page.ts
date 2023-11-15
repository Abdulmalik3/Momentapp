import { Component, OnInit } from '@angular/core';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { DataHelperService } from 'src/app/shared/data-helper.service';
@Component({
  selector: 'app-night-post',
  templateUrl: './night-post.page.html',
  styleUrls: ['./night-post.page.scss'],
})
export class NightPostPage implements OnInit {

  nightPosts: string[] = [];

  constructor(
    public photo: PhotoViewer,
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
    this.photo.show('https://cdn.pixabay.com/photo/2022/09/29/10/46/grass-7487114_1280.jpg', 'image title', Options)
  }

  ngOnInit() {
  }

}
