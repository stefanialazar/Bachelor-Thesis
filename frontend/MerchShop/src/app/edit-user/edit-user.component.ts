import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../core/request.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  user : any;
  message: { type: string, text: string } | null = null;
  initialEmail: string = '';

  constructor(private route: ActivatedRoute, private reqS: RequestService) {}

  

  ngOnInit(): void {
    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.reqS.get('https://localhost:44341/api/user/' + this.userId, { headers }).subscribe((res: any) => {
      this.user = res;
      this.initialEmail = this.user.email;
      })
    });
  }

  updateEmail() {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(this.user.email)) {
      this.message = { type: 'danger', text: 'Invalid email format' };
      return;
    }

    if (this.user.email === this.initialEmail) {
      this.message = { type: 'danger', text: 'Email unchanged from previous value'};
      return;
    }
  
    const token: any = localStorage.getItem("jwt");
        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        });
    
        const userEmailUpdateData = {
          UserId: this.userId,
          NewEmail: this.user.email,
        };
    
        this.reqS.post('https://localhost:44341/api/users/update-email', userEmailUpdateData, { headers }).subscribe((res: any) => {
          this.message = { type: 'success', text: 'Email updated successfully' };
          setTimeout(() => {
            window.location.reload();
          }, 5000);  
        }, (error) => {
          console.log('Error updating email:', error);
          this.message = { type: 'danger', text: 'Error updating email' };
        });      
  }

  updatePassword() {
    if (!this.user.oldPassword || !this.user.newPassword) {
      this.message = { type: 'danger', text: 'Both old and new passwords are required' };
      return;
    }

    if (!this.isValidPassword(this.user.newPassword)) {
      this.message = { type: 'danger', text: 'Invalid new password. Please make sure it meets all the requirements.' };
      return;
    }
  
    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  
    const userPasswordUpdateData = {
      UserId: this.userId,
      OldPassword: this.user.oldPassword,
      NewPassword: this.user.newPassword,
    };

    console.log(userPasswordUpdateData);
  
    this.reqS.post('https://localhost:44341/api/users/update-password', userPasswordUpdateData, { headers }).subscribe((res: any) => {
      this.message = { type: 'success', text: 'Password updated successfully' };
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }, (error) => {
      console.log('Error updating password:', error);
      this.message = { type: 'danger', text: 'Error updating password' };
    });
    
  }

  isValidPassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }
  

  updateAddress() {
    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    });

    const userAddressesUpdateData = {
      UserId: this.userId,
      Address1: this.user.address1,
      Address2: this.user.address2
    };

    console.log(userAddressesUpdateData);

    this.reqS.post('https://localhost:44341/api/users/update-addresses', userAddressesUpdateData, { headers }).subscribe((res: any) => {
      this.message = { type: 'success', text: 'Addresses updated successfully' };
      setTimeout(() => {
        window.location.reload();
      }, 5000);  
    }, (error) => {
      console.log('Error updating addresses:', error);
      this.message = { type: 'danger', text: 'Error updating addresses' };
    });
    
  }

  onMessageClosed() {
    this.message = null;
  }
  
}
