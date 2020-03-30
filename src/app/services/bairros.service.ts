import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bairros } from '../modules/models/bairro.model';

@Injectable({
  providedIn: 'root'
})
export class BairrosService {

  constructor(private http: HttpClient) { }

  public bairros(): Observable<Bairros> {
    return this.http.get<Bairros>(`${environment.apiUrl}/v1/bairros`);
  }

  public loadAndSave(): Promise<Bairros> {
    return new Promise((resolve, reject) => {
      this.bairros()
        .subscribe(result => {
          this.save(result)
          resolve(result)
        }, (error) => reject(error))
    });
  }

  public save(bairros: Bairros) {
    localStorage.setItem('bairros', JSON.stringify(bairros))
  }

  public getLocal(): Bairros {
    const json = localStorage.getItem('bairros')
    return JSON.parse(json) || { bairros: [] };
  }
}