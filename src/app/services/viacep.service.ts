import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class viacepService {
  url: string ='https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}
    async read (cep: string): Promise<any>{
      return this.http.get(this.url + cep + '/json'). toPromise();
   }
}
