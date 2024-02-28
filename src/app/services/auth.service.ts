import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Credenciais} from "../models/credenciais";
import {API_CONFIG} from "../config/api.config";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenicate(creds: Credenciais){
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token')
    if(token != null){
        return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout(){
    localStorage.clear();
  }
}