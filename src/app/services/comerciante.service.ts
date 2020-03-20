import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComercianteService {

  constructor(
    private http: HttpClient
  ) { }

  public endereco(cep: string): Observable<any> {
    const cepFilter = cep?.replace(/[^0-9]/g, '')
    return this.http.get(`https://viacep.com.br/ws/${cepFilter}/json`)
  }
}