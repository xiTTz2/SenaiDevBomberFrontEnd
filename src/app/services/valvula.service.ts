import { valvula } from 'src/app/models/valvula';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValvulaService {
  url: string = environment.apiUrl + '/valvulas';

  constructor(private http: HttpClient) { }
  async create(valvula: valvula) {
    return this.http
      .post(this.url, valvula)
      .toPromise();
  }
  async read(id: number) {
    return this.http.get(this.url+ '/' + id).toPromise();
  }
  async update(valvula: valvula) {
    return this.http
      .put(this.url + '/' + valvula.id, valvula)
      .toPromise()
  }
  async delete(id: number) {
    this.http.delete(this.url + '/' + id).toPromise();
  }

  async list() {
    return this.http.get<valvula[]>(this.url).toPromise();
  }



}