import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  private authToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZXNyYWExNjciLCJqdGkiOiI4ODJiMDRkOC0yZGJmLTRkN2UtYjRjMy03ZDZkYjA5NGMxZDEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1NyIsImV4cCI6MTczNDQ5NTQyOSwiaWF0IjoxNzM0NDM1NDI5LCJuYmYiOjE3MzQ0MzU0Mjl9.42iNjxy0a33vab01OFVNUWdEbjfkAoXvWRi0qPGnv14';
  setAuthToken(newToken: string): void {
    this.authToken = newToken;
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  getCategories(): Observable<any> {
    return this._http.get('https://ctrl-p.runasp.net/api/Category/Get-All');
  }

  // Add category
  addCategory(data: object): Observable<any> {
    return this._http.post('https://ctrl-p.runasp.net/api/Category/add', data, {
      headers: this.getHeaders(),
    });
  }
}
