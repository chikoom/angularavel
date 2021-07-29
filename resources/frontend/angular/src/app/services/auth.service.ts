import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) { }

  login(data: object): Observable<any> {
    return this.http.post(`${environment.api}/login`, data);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.api}/logout`, {});
  }

  register(data: object): Observable<User> {
    return this.http.post<User>(`${environment.api}/register`, data);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.api}/user`);
  }

  updateUserInfo(data: object): Observable<User> {
    return this.http.put<User>(`${environment.api}/users/info`, data);
  }

  updateUserPassword(data: object): Observable<User> {
    return this.http.put<User>(`${environment.api}/users/password`, data);
  }


}
