import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from '../core/request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private reqS: RequestService) {
  }
    loginUser(obj: any){
        return this.reqS.post('https://localhost:44341/api/users/login', obj);
    }
    getUserById(id: any){
      return this.reqS.get('https://localhost:44341/api/users/' + id);
    }

}
