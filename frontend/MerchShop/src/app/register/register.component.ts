import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from '../core/request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private reqS: RequestService, private router: Router) { }

  ngOnInit(): void {
  }
  submitRegister() {
    const email = (<HTMLInputElement>document.getElementById("username")).value;
    const password = (<HTMLInputElement>document.getElementById("pw")).value;
    const lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
    const firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
    const object = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }
    this.reqS.post('https://localhost:44341/api/users', object).subscribe((res: any) => {
      console.log(res);
    })
    this.router.navigate(['/login']);
  }
}
