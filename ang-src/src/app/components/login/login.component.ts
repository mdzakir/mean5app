import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.authenticateUser(user).subscribe( (data:any) => {
      console.log(data);
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.toastr.success('Login successful!');
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error(data.msg);
        this.router.navigate(['/login']);
      }
    })
  }

}
