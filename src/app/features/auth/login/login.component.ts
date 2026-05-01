import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form:any = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  login(){
    this.auth.login(this.form).subscribe((res:any) => {

      console.log("LOGIN RESPONSE:", res);

      this.auth.saveToken(res.token);
      this.auth.saveRole(res.role);

      if(res.role === "ADMIN"){
        this.router.navigate(['/admin']);
      }
      else if(res.role === "BIBLIOTHECAIRE"){
        this.router.navigate(['/biblio']);
      }
      else {
        this.router.navigate(['/user']);
      }

    }, err => {
      console.error("LOGIN ERROR:", err);
    });
  }
}