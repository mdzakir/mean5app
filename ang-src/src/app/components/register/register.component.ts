import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if(!this.validateService.validateRegister(user)){
      this.toastr.error('Please fill appropriate values');
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.toastr.error('Please use valid email');
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe((data:any) => {
      if(data.success){
        this.toastr.success('You are now registered and can login.');
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Something went wrong.');
        this.router.navigate(['/register']);
      }
    })
  }

}
