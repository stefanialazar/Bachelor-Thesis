import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //@Output() loggedUser: EventEmitter<any> = new EventEmitter();


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
    this.loginService.loginUser(obj).subscribe((res: any) => {
      const token = res.token;
      localStorage.setItem("jwt", token);
      this.router.navigate(['/products']);
    });

  }
}
