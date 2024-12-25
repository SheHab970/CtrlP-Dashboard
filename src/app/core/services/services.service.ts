import { HttpClient , HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private services_api :string = 'https://ctrl-p.runasp.net/api/Service/';

  constructor(private http: HttpClient) { }

  getServices(): Observable<any> {
    return this.http.get(this.services_api + 'Get-All');
  }

  addServices(service: FormData): Observable<any> {
    return this.http.post(this.services_api + 'add', service);
  }

  deldteService(id: number): Observable<any>{
    // const service = data
    const params = new HttpParams().set('id', id);
    return this.http.delete(this.services_api + 'Delete' , {params: params});
  }

   updateService(service: FormData): Observable<any> {
    return this.http.put(this.services_api + 'update', service);
  }
}
