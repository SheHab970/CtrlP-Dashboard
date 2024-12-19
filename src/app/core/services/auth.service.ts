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
    localStorage.removeItem('token');  //remove token from localStorage
    this.router.navigate(['login']);   //redirect to login page
  }

  // store response token methode
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  // get this token methode
  getToken(): string|null{
    return localStorage.getItem('token') // get token from localStorage
  }

  // return usre Details 
  getUserDetails(){
    const token = this.getToken();
    if(!token) return null;
    const decodedToken: any = jwtDecode(token);
    const name_varible = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
    const role_varible = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const userDetails = {
      name: decodedToken[name_varible],
      role: decodedToken[role_varible],
    };
    return userDetails;
  }

  // check if user is anmin or not
  isAdmin(){
    const role = this.getUserDetails();
    if(role?.role == 'Admin') {
      return true;
    }else{
      return false;
    }
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
