import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '@shared./interface/session.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { userInterface } from '@shared/interfaces/user.model';
import { map, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

var access_token = localStorage.getItem('access_token');

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access_token}`,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentSessionSubject: BehaviorSubject<Session>;
  public currentSession: Observable<Session>;
  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
    const session = localStorage.getItem('access_token') as unknown as Session;
    this.currentSessionSubject = new BehaviorSubject<Session>(session);
    this.currentSession = this.currentSessionSubject.asObservable();
  }

  public get currentSessionValue(): Session {
    return this.currentSessionSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<Session>(`${this.url}/login-system`, { username, password })
      .pipe(
        tap((data) => {
          localStorage.setItem('access_token', data['access_token']);
          this.currentSessionSubject.next(data);
        })
      );
  }

  loginUN(uname: string, pwd: string) {
    let request = this.http.post<Session>(
      `${environment.apiUrl}/login-system`,
      {
        username: uname,
        password: pwd,
      }
    );

    return new Promise((resolve, reject) => {
      request.subscribe(
        (response) => {
          if (response) {
            localStorage.setItem('access_token', response['access_token']);
            localStorage.setItem('permissions', response['permissions']);
            localStorage.setItem('exp', Date.now().toString());
            this.currentSessionSubject.next(response);
            resolve({ acceso: true });
          } else {
            resolve({ acceso: false });
          }
        },
        (error: any) => {
          resolve(error);
        }
      );
    });
  }

  logout() {
    let request = this.http.delete<Session>(
      `${this.url}/logout-system`,
      httpOptions
    );

    return request.pipe(
      map((data) => {
        if (data) {
          // remove user from local storage to log user out
          localStorage.removeItem('access_token');
          localStorage.removeItem('permissions');
          this.currentSessionSubject.next(null);
          localStorage.clear();
        }
        return data;
      })
    );
  }

  deleteSession() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    this.currentSessionSubject.next(null);
  }
}
