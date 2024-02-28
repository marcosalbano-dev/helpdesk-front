import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../config/api.config";
import {Observable} from "rxjs";
import {Cliente} from "../models/cliente";

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/tecnicos`)
  }

  create(tecnico:Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/tecnicos`, tecnico);
  }

  update(tecnico: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`, tecnico)
  }

  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }

}
