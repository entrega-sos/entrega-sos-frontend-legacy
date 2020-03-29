import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bairros } from '../modules/models/bairro.mode';

@Injectable({
  providedIn: 'root'
})
export class BairrosService {

  constructor(private http: HttpClient ) { }
  
  public bairros() :Observable<Bairros> {
    return this.http.get<Bairros>(`${environment.apiUrl}/v1/bairros`);
  }
}