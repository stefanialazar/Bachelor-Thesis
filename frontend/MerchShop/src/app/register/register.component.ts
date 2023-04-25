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

    if (!this.isValidEmail(email) || !this.isValidPassword(password) || !this.isValidName(firstName) || !this.isValidName(lastName)) {
      alert('Invalid input. Please make sure all fields meet the requirements.');
      return;
    }

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

  isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  isValidName(name: string) {
    const nameRegex = /^[A-Z][a-z]*$/;
    return nameRegex.test(name);
  }
}
