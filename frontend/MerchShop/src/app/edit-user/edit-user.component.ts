import { Component, OnInit } from '@angular/core';
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
      console.log(this.userId);
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
        }, (error) => {
          console.log('Error updating email:', error);
          this.message = { type: 'danger', text: 'Error updating email' };
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);        
  }

  updatePassword() {
  }

  updateAddress() {
  }

  onMessageClosed() {
    this.message = null;
  }
  
}
