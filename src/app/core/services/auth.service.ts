import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth_api:string = 'https://ctrl-p.runasp.net/api/Auth/Login' 

  constructor(private _HttpClient: HttpClient, private router: Router) {}


  login(userData: object): Observable<any> {
    return this._HttpClient.post(this.auth_api, userData);
  }
  // log Out methode
  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  // store response token methode
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  // get this token methode
  getToken(): string|null{
    return localStorage.getItem('token')
  }

  // return usre Details 
  getUserDetails(){
    const token = this.getToken();
    if(!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken;
  }

  // is login => 
  isLoginIn(): boolean{
    return !!localStorage.getItem('token')
  }

  private isTokenExpired(){
    const token = this.getToken();
    if(!token) return true;
    const decode = jwtDecode(token);
    const isTokenExpired = Date.now() >= decode['exp']! * 1000;
    if(isTokenExpired) this.logOut();
    return isTokenExpired;
  }
}
