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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJqdGkiOiI3Y2M1NjA1Zi1lMTNhLTRiZWUtOGYyMi0zNjdlZTkyMmY2NWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1NyIsImV4cCI6MTczNDc1ODM5NywiaWF0IjoxNzM0Njk4Mzk3LCJuYmYiOjE3MzQ2OTgzOTd9.V_nWdn-LhcanyQtvbv_rT_RqOI-peoI9H-zn4KXT45c';
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

  getProductBYid(id: number): Observable<any> {
    return this._http.get(
      `https://ctrl-p.runasp.net/api/Product/GetProduct/${id}`
    );
  }
  // Get the list of products
  getProductlist(): Observable<any> {
    return this._http.get(this.baseUrl + 'Product/GetAllProducts/');
  }

  getCatlist(): Observable<any> {
    return this._http.get('https://ctrl-p.runasp.net/api/Category/Get-All');
  }

  // Get categories

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

  //  frames
  getFrames(): Observable<any[]> {
    return this._http.get<any[]>(
      'https://ctrl-p.runasp.net/api/Frame/Get-All',
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  addFrame(newFrame: { name: string }): Observable<any> {
    return this._http.post(
      'https://ctrl-p.runasp.net/api/Frame/add',
      newFrame,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  //!mat
  getMaterials(): Observable<any[]> {
    return this._http.get<any[]>(
      'https://ctrl-p.runasp.net/api/Material/Get-All',
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

  //size
  getSizes(): Observable<any[]> {
    return this._http.get<any[]>('https://ctrl-p.runasp.net/api/Size/Get-All', {
      headers: this.getAuthHeaders(),
    });
  }
  addSize(newSize: { name: string }): Observable<any> {
    return this._http.post('https://ctrl-p.runasp.net/api/Size/add', newSize, {
      headers: this.getAuthHeaders(),
    });
  }
}
