import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseurl :string = 'https://ctrl-p.runasp.net/api/Ordering/';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get(this.baseurl + 'Get-Every-Order');
  }

  getOrderDetails(id: number): Observable<any>{
    return this.http.get(this.baseurl + `Get-Order-Details${id}`)
  }

  changeStatus(Status: string, id: number): Observable<any>{
    
    const params = new HttpParams().set('orderStatus', Status);
    
    return this.http.put(this.baseurl + `Update-OrderStatus${id}`, {} , {params: params});
  }
}






// { 
//   params : new HttpParams().set('orderStatus', orderStatus),
//  }