import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends RestService {

  endpoint = `${environment.api}/orders`

  export(): Observable<Blob> {
    return this.http.post(`${environment.api}/export`, {}, { responseType: 'blob' });
  }

  chart(): Observable<any> {
    return this.http.get(`${environment.api}/chart`)
  }

}
