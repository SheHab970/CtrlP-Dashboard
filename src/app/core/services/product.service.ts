import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { list } from '../interface/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;
  getProductlist() {
    return this._http.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  getcategories(): Observable<any> {
    return this._http.get(this.baseUrl + 'categories');
  }
}
