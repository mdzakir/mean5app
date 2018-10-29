import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {ValidateService} from "../../services/validate.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postText: String;
  tags: String;
  commentsEnabled:boolean;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
    this.commentsEnabled = true;
  }

  onPostSubmit() {
    const post = {
      postText: this.postText,
      tags: this.tags,
      commentsEnabled: this.commentsEnabled
    };

    if (!this.validateService.validatePost(post)) {
      this.toastr.error('Ah! Empty post? Please write some text.')
      return false;
    }

    this.authService.savePost(post).subscribe( (data: any) => {
      if (data.success) {
        this.toastr.success('Posted successfully!');
          this.authService.listPostSubject.next('postAdded');
      } else {
        this.toastr.error('Something went wrong!');
      }
    });
  }

}
