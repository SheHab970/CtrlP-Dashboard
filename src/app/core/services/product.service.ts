import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProductById(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private _http: HttpClient) {}

  baseUrl: string = `https://ctrl-p.runasp.net/api/`;

  private authToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZW1hbjEyMyIsImp0aSI6IjI1ODNiNGNmLTEwNTEtNGIxMC04NjMwLTJmMTQ2MzA5ODE3ZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxMCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1NyIsImV4cCI6MTczNDYwMzkzNywiaWF0IjoxNzM0NTQzOTM3LCJuYmYiOjE3MzQ1NDM5Mzd9.EKY1kS8YlE-1oZ38p_eT8sY_aYtspCDws5XxbjNPNOE';
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
    return this._http.get(this.baseUrl + 'Product/GetAllProducts/');
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
  UpdateProduct(data: FormData): Observable<any> {
    return this._http.put(
      'https://ctrl-p.runasp.net/api/Product/UpdateProduct',
      data,
      {
        headers: this.getHeaders(),
      }
    );
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
