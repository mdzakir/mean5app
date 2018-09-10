import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postList;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
      this.authService.listPostSubject.subscribe( (value) => {
          this.getPosts();
      });
      this.getPosts();
  }

  getPosts(){
    this.authService.getPosts()
      .subscribe(posts => {
        this.postList = posts;
      });
  }

}
