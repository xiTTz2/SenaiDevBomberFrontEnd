import { HttpClient } from '@angular/common/http';
import { Token } from 'src/app/models/Token';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { bombeiro } from '../models/bombeiro';
import { JwtRequest } from '../models/JwtRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  url = `${environment.apiUrl}/login`;
  
    
   async createToken(request: JwtRequest) {
    
    const token = await this.http.post<Token>(this.url, request).toPromise();


    this.saveUser(token.bombeiro);
    this.storeToken(token);

     return token;
   }
   isLogged() {
     if (this.getStoredToken()) return true;
     else return false;
   }

   isAdmin(){
     return this.getUser().perfilAcesso == "ADMIN"
   }

   saveUser(bombeiros: bombeiro) {
    localStorage.setItem('bombeiro', JSON.stringify(bombeiros));
   }

   getUser(): bombeiro {
     try {
       const str = localStorage.getItem('bombeiro');
       if (!str) return {} as bombeiro;
       return JSON.parse(str) as bombeiro;
     } catch (err) {
       return {} as bombeiro;
     }
   }

   storeToken(response: Token) {
    localStorage.setItem('token', JSON.stringify(response));
  
   }
     

   getStoredToken() {
     try {
       const str = localStorage.getItem('token');
       if (!str) return undefined;
       return JSON.parse(str) as Token;
     } catch (err) {
      return undefined;
     }
   }

   logout() {
     localStorage.removeItem('token');
    localStorage.removeItem('bombeiro');
   }
}
