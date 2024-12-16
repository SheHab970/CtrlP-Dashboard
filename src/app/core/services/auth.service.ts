import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth_api:string = 'https://ctrl-p.runasp.net/api/Auth/Login' 

  constructor(private _HttpClient: HttpClient) {}


  login(userData: object): Observable<any> {
    return this._HttpClient.post(this.auth_api, userData);
  }
}
