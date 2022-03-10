import { usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string = environment.apiUrl + '/usuario';

  constructor(private http: HttpClient) { }
  async create(usuario: usuario) {
    return this.http
      .post(this.url, usuario)
      .toPromise();
  }
  async read(id: number) {
    return this.http.get(this.url+ '/' + id).toPromise();
  }
  async update(usuario: usuario) {
    return this.http
      .put(this.url + '/' + usuario.id, usuario)
      .toPromise()
  }
  async delete(id: number) {
    this.http.delete(this.url + '/' + id).toPromise();
  }

  async list() {
    return this.http.get(this.url).toPromise();
  }



}