import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private iss = {
    login: `${environment.apiUrl}/login`,
  };

  constructor() {}

  //Set of the token and handle self
  handle(token) {
    this.set(token);
  }

  //Add of token in localstorage
  set(token) {
    localStorage.setItem('token', token);
  }

  //Get of token storage in the localstorage
  get() {
    return localStorage.getItem('token');
  }

  //Eliminar el token almacenado en localstorage
  remove() {
    localStorage.removeItem('token');
  }

  //Validate if the token is correct
  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  //Get body the token (payload)
  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  //resolved cifrate the payload or body the token
  decode(payload) {
    return JSON.parse(atob(payload));
  }

  //Method Response the Verificate Login
  loggedIn() {
    return this.isValid();
  }
}