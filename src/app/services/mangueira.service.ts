import { mangueira } from 'src/app/models/mangueira';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MangueiraService {
  url: string = environment.apiUrl + '/mangueiras';

  constructor(private http: HttpClient) { }
  async create(mangueira: mangueira) {
    return this.http
      .post(this.url, mangueira)
      .toPromise();
  }
  async read(id: number) {
    return this.http.get(this.url+ '/' + id).toPromise();
  }
  async update(mangueira: mangueira) {
    return this.http
      .put(this.url + '/' + mangueira.id, mangueira)
      .toPromise()
  }
  async delete(id: number) {
    this.http.delete(this.url + '/' + id).toPromise();
  }

  async list() {
    return this.http.get<mangueira[]>(this.url).toPromise();
  }



}