import { bombeiro } from './../models/bombeiro';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BombeirosService {
  url: string = environment.apiUrl + '/bombeiro';

  constructor(private http: HttpClient) { }

  async create(bombeiro: bombeiro) {
    const bombeiroCriado = await this.http.post(this.url, bombeiro).toPromise(); 
    return bombeiroCriado;
  }
  async read(id: number) {
    const bombeiros = await this.http.get(this.url+ '/' + id).toPromise(); 
    return bombeiros;
  }
  async update(id: number ,bombeiro: bombeiro) {
     const bombeiroUpdate = await this.http.put(this.url + '/' + bombeiro.id, bombeiro).toPromise()

     return bombeiroUpdate;
  }
  async delete(id: number) {
   await  this.http.delete(this.url + '/' + id).toPromise();
  }

  async list() {
    const bombeiroList = await this.http.get(this.url).toPromise(); 
  
    return bombeiroList;
  }


  getVisitante(): Observable<any> {
    return this.http.get(this.url + 'VISITANTE', {responseType: 'text'});
  }

  getAdmin(): Observable<any> {
    return this.http.get(this.url + 'ADMIN', {responseType: 'text'});
  }


}