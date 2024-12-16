import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;

  private authToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZW1hbjEyMyIsImp0aSI6IjM0MTU5YjdhLWQ1OTAtNGI4Yi1iZmI2LTk2OTA1Y2FkODM2NyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxMCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1NyIsImV4cCI6MTczNDQwNzE1MSwiaWF0IjoxNzM0MzQ3MTUxLCJuYmYiOjE3MzQzNDcxNTF9.tFvMUGjziIO_cOLcTGElLtHwbBJ0Z2M0ayGp1Xh3APQ';

  setAuthToken(newToken: string): void {
    this.authToken = newToken;
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
  }

  getProductlist(): Observable<any> {
    return this._http.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  getcategories(): Observable<any> {
    return this._http.get(this.baseUrl + 'categories');
  }

  // Add product
  addProduct(data: object): Observable<any> {
    return this._http.post('https://ctrl-p.runasp.net/api/Product', data, {
      headers: this.getAuthHeaders(),
    });
  }

  // Add category
  addCat(data: object): Observable<any> {
    return this._http.post('https://ctrl-p.runasp.net/api/Category/add', data, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get frames
  getFrames(): Observable<any[]> {
    return this._http.get<any[]>(
      'https://ctrl-p.runasp.net/api/Frame/Get-All',
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // Add a new frame
  addFrame(newFrame: { name: string }): Observable<any> {
    return this._http.post(
      'https://ctrl-p.runasp.net/api/Material/add',
      newFrame,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}
