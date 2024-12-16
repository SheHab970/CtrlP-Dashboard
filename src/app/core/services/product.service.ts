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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZXNyYWExNjciLCJqdGkiOiI5YTdmMjYyYi1mNjM5LTQxZDYtODM3NS02MjExZGMzNGRmMTMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1NyIsImV4cCI6MTczNDQzMzk3NSwiaWF0IjoxNzM0MzczOTc1LCJuYmYiOjE3MzQzNzM5NzV9.xapL7O6ATgs9AKQWBJXJEgElbtGL10GdE7g5D8pJP6g';

  setAuthToken(newToken: string): void {
    this.authToken = newToken;
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  // Get the list of products
  getProductlist(): Observable<any> {
    return this._http.get(
      'https://ctrl-p.runasp.net/api/Product/GetAllProducts'
    );
  }

  // Get categories
  getCategories(): Observable<any> {
    return this._http.get(this.baseUrl + 'categories');
  }

  // Add product
  addProduct(data: object): Observable<any> {
    return this._http.post('https://ctrl-p.runasp.net/api/Product', data, {
      headers: this.getAuthHeaders(),
    });
  }

  // Add category
  addCategory(data: object): Observable<any> {
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

  // Add material
  addMaterial(newMaterial: { name: string }): Observable<any> {
    return this._http.post(
      'https://ctrl-p.runasp.net/api/Material/add',
      newMaterial,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // Get materials
  getMaterials(): Observable<any[]> {
    return this._http.get<any[]>(
      'https://ctrl-p.runasp.net/api/Material/Get-All',
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // Add size
  addSize(newSize: { name: string }): Observable<any> {
    return this._http.post('https://ctrl-p.runasp.net/api/Size/add', newSize, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get sizes
  getSizes(): Observable<any[]> {
    return this._http.get<any[]>('https://ctrl-p.runasp.net/api/Size/Get-All', {
      headers: this.getAuthHeaders(),
    });
  }

  // DELETE product method with FormData
  deleteProduct(productId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = new FormData(); // Or send a custom payload if needed
    body.append('productId', productId); // Append productId to FormData

    return this._http.request(
      'DELETE',
      'https://ctrl-p.runasp.net/api/Product/DeleteProduct',
      {
        headers: headers,
        body: body, // Send the FormData as the body of the request
      }
    );
  }
}
