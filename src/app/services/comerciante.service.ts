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

  endereco(cep: string): Observable<any> {
    const cepFilter = cep?.replace(/[^0-9]/g, '');
    return this.http.get(`https://viacep.com.br/ws/${cepFilter}/json`);
  }

  create(comerciante: Partial<Comerciante>): Observable<Partial<Comerciante>> {
    return this.http.post<Partial<Comerciante>>(`${environment.apiUrl}/v1/empresas`, comerciante);
  }

  update(comerciante: Partial<Comerciante>): Observable<Partial<Comerciante>> {
    return this.http.put<Partial<Comerciante>>(`${environment.apiUrl}/v1/empresas`, comerciante);
  }

  delete(id: string): Observable<Partial<Comerciante>> {
    return this.http.delete<Partial<Comerciante>>(`${environment.apiUrl}/v1/empresas/${id}`);
  }

  get(id: string): Observable<Partial<Comerciante>> {
    return this.http.get<Partial<Comerciante>>(`${environment.apiUrl}/v1/empresas/${id}`);
  }

  list(page: number, perPage: number): Observable<Partial<ComercianteResult>> {
    return this.http.get<Partial<ComercianteResult>>(`${environment.apiUrl}/v1/empresas?page=${page}&per_page=${perPage}`);
  }

  listWithQuery(query: string = null): Observable<any> {
    return this.http.get(`${environment.apiUrl}/v1/empresas${query ? '?' + query : ''}`);
  }

  loadAll(): Promise<Partial<ComercianteResult>> {
    const promise = new Promise((resolve, reject) => {
      const data: Partial<ComercianteResult> = {
        items: []
      }

      this.load(data, 1, resolve, reject);
    });

    return promise;
  }

  loadAndSave(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.loadAll()
        .then(r => {
          this.save(r.items);
          resolve(r.items);
        })
        .catch(reject);
    });
  }

  save(items: Partial<Comerciante[]>) {
    localStorage.setItem('comerciantes', JSON.stringify(items));
  }

  loadFromCache(): Partial<Comerciante[]> {
    const json = localStorage.getItem('comerciantes');
    if (json) {
      return JSON.parse(json);
    } else {
      return [];
    }
  }


  private load(data: Partial<ComercianteResult>, page: number = 1, resolve, reject) {
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

  fake(bairros: Bairros) {
    const comerciante: Partial<Comerciante> = {
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
        'Dinheiro',
        'Crédito',
        'Débito'
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
