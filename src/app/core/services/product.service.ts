import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  baseUrl: string = `https://ctrl-p.runasp.net/api/`;

  private authToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJqdGkiOiJkNGYxYzk3OS1kNDY2LTRiZDEtYjFiYS01YTQzYzhlZmE1ODkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1NyIsImV4cCI6MTczNDUzNzQ5NCwiaWF0IjoxNzM0NDc3NDk0LCJuYmYiOjE3MzQ0Nzc0OTR9.7QNO1s2bqj1h0lNxymQHmRFdjM3dZshl7n8v101iJhc';
  setAuthToken(newToken: string): void {
    this.authToken = newToken;
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  // Get the list of products
  getProductlist(): Observable<any> {
    return this._http.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  getCatlist(): Observable<any> {
    return this._http.get('https://ctrl-p.runasp.net/api/Category/Get-All');
  }

  // Get categories
  getCategories(): Observable<any> {
    return this._http.get(this.baseUrl + 'categories');
  }

  // Add product
  addProduct(data: FormData): Observable<any> {
    return this._http.post('https://ctrl-p.runasp.net/api/Product', data, {
      headers: this.getHeaders(),
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
      'https://ctrl-p.runasp.net/api/Frame/add',
      newFrame,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  addMaterial(newMaterial: { name: string }): Observable<any> {
    return this._http.post(
      'https://ctrl-p.runasp.net/api/Material/add',
      newMaterial,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  getMaterials(): Observable<any[]> {
    return this._http.get<any[]>(
      'https://ctrl-p.runasp.net/api/Material/Get-All',
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  addSize(newSize: { name: string }): Observable<any> {
    return this._http.post('https://ctrl-p.runasp.net/api/Size/add', newSize, {
      headers: this.getAuthHeaders(),
    });
  }

  getSizes(): Observable<any[]> {
    return this._http.get<any[]>('https://ctrl-p.runasp.net/api/Size/Get-All', {
      headers: this.getAuthHeaders(),
    });
  }
}
