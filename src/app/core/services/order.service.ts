import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order_api :string = 'https://ctrl-p.runasp.net/api/Ordering/Get-Every-Order';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get(this.order_api);
  }
}
