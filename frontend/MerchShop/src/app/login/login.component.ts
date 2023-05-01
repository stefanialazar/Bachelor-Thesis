import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: { type: string, text: string } | null = null;


  constructor(private loginService: LoginService, private router: Router) { }


  ngOnInit(): void {
  }

  submitLogin() {
  const username = (<HTMLInputElement>document.getElementById("username")).value;
  const password = (<HTMLInputElement>document.getElementById("pw")).value;
  const obj = {
    username: username,
    password: password
  };
  this.loginService.loginUser(obj).subscribe(
    (res: any) => {
      const token = res.token;
      localStorage.setItem("jwt", token);
      this.router.navigate(['/welcome']);
    },
    (error) => {
      if (error.status === 401) {
        this.message = { type: 'danger', text: 'Email or password is incorrect.' };
      } else {
        this.message = { type: 'danger', text: 'Email or password is incorrect.' };
      }
    }
  );
}

onMessageClosed() {
  this.message = null;
}


}
