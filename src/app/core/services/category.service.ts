import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  private authToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJqdGkiOiI3Y2M1NjA1Zi1lMTNhLTRiZWUtOGYyMi0zNjdlZTkyMmY2NWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1NyIsImV4cCI6MTczNDc1ODM5NywiaWF0IjoxNzM0Njk4Mzk3LCJuYmYiOjE3MzQ2OTgzOTd9.V_nWdn-LhcanyQtvbv_rT_RqOI-peoI9H-zn4KXT45c';
  setAuthToken(newToken: string): void {
    this.authToken = newToken;
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  getCategories(): Observable<any> {
    return this._http.get('https://ctrl-p.runasp.net/api/Category/Get-All');
  }
  getCategoryById(id: number): Observable<any> {
    return this.getCategories().pipe(
      map((categories: any[]) => {
        return categories.find((category) => category.id === id);
      })
    );
  }

  // Add category
  addCategory(data: FormData): Observable<any> {
    return this._http.post('https://ctrl-p.runasp.net/api/Category/add', data, {
      headers: this.getAuthHeaders(),
    });
  }

  editCategory(data: FormData): Observable<any> {
    return this._http.put(
      'https://ctrl-p.runasp.net/api/Category/update',
      data,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
  deleteCategory(Category: number): Observable<any> {
    const url = `https://ctrl-p.runasp.net/api/Category/DeleteCategory/${Category}`;
    return this._http.delete(url, {
      headers: this.getAuthHeaders(),
    });
  }
  UpdateProduct(data: FormData): Observable<any> {
    return this._http.put(
      'https://ctrl-p.runasp.net/api/Product/UpdateProduct',
      data,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}
