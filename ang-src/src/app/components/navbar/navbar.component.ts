import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  auth = this.authService.loggedIn();
  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastr.success('Logged out successfully!');
    return false;
  }

}
