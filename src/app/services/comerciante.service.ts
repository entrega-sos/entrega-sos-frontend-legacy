import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comerciante, ComercianteResult } from '../modules/models/comerciante.model';
import { environment } from 'src/environments/environment';
import * as faker from 'faker/locale/pt_BR';
import { Bairros } from '../modules/models/bairro.model';

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

  public create(comerciante: Comerciante): Observable<Comerciante> {
    return this.http.post<Comerciante>(`${environment.apiUrl}/v1/empresas`, comerciante)
  }

  public update(comerciante: Comerciante): Observable<Comerciante> {
    return this.http.put<Comerciante>(`${environment.apiUrl}/v1/empresas`, comerciante)
  }

  public delete(id: string): Observable<Comerciante> {
    return this.http.delete<Comerciante>(`${environment.apiUrl}/v1/empresas/${id}`)
  }

  public get(id: string): Observable<Comerciante> {
    return this.http.get<Comerciante>(`${environment.apiUrl}/v1/empresas/${id}`)
  }

  public list(page: number, perPage: number): Observable<ComercianteResult> {
    return this.http.get<ComercianteResult>(`${environment.apiUrl}/v1/empresas?page=${page}&per_page=${perPage}`)
  }

  public loadAll(): Promise<ComercianteResult> {
    const promise = new Promise((resolve, reject) => {
      const data: ComercianteResult = {
        items: []
      }

      this.load(data, 1, resolve, reject);
    });

    return promise;
  }

  public loadAndSave(): Promise<Comerciante[]> {
    return new Promise((resolve, reject) => {
      this.loadAll()
        .then(r => {
          this.save(r.items);
          resolve(r.items)
        })
        .catch(reject)
    })
  }

  public save(items: Comerciante[]) {
    localStorage.setItem('comerciantes', JSON.stringify(items));
  }

  public loadFromCache(): Comerciante[] {
    const json = localStorage.getItem('comerciantes')
    if (json) {
      return JSON.parse(json)
    } else {
      return []
    }
  }


  private load(data: ComercianteResult, page: number = 1, resolve, reject) {
    this.list(page, 100)
      .subscribe(r => {
        if (r.items) {
          data.items = data.items.concat(r.items);
        }

        if (r._meta.page < r._meta.total_pages) {
          this.load(data, page + 1, resolve, reject);
        } else {
          resolve(data);
        }
      }, error => reject(error));
  }

  public fake(bairros: Bairros) {
    const comerciante: Comerciante = {
      descricao: faker.company.companyName(),
      usuario: faker.internet.userName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      whatsapp: faker.phone.phoneNumber('###########'),
      telefone: faker.phone.phoneNumber('###########'),
      senha: faker.random.alphaNumeric(8),
      cep: faker.address.zipCode('########'),
      endereco: faker.address.streetAddress(),
      bairro: faker.random.arrayElement(bairros.bairros),
      cidade: faker.address.city(),
      uf: faker.address.stateAbbr(),
      tipo_negocio: 'Mercado',
      meio_pagamento: [
        "Dinheiro",
        "Crédito",
        "Débito"
      ],
      dias_horarios: 'Seg a Sex 8 as 18, Sab e Dom 8 as 12',
      delivery: faker.random.boolean(),
      instagram: `https://instagram.com/${faker.internet.userName()}`,
      facebook: `https://facebook.com/${faker.internet.userName()}`,
      site: `http://${faker.internet.domainName()}`,
      obs: faker.lorem.words(20)
    }

    this.create(comerciante).subscribe(r => console.log(r), error => console.error(error));
  }
}