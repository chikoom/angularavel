import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  abstract get endpoint(): string;

  constructor(protected http: HttpClient) { }

  all(pageNumber?: number): Observable<any> {
    let URL = this.endpoint
    if (pageNumber) URL += `?page=${pageNumber}`
    return this.http.get<any>(URL);
  }

  delete(userID: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${userID}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.endpoint, data);
  }

  update(userID: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/${userID}`, data);
  }

  getByID(userID: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${userID}`)
  }
}
