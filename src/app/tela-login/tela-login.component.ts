import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss'],
})


export class TelaLoginComponent implements OnInit {

  // Variaveis dos inputs
  matricula: string = "";
  senha: string = "";

  //Ativador do Alert de erro
  isAlert1 : boolean = false;

  constructor(private authService: AuthService ,private router: Router) {
  }


async ngOnInit() {
    const token = this.authService.getStoredToken();
    if(token && this.authService.isLogged()){
      this.router.navigate(['home']);
    }
  }



  async entrar() {

    const newTokenRequest: any = {
      matricula: this.matricula,
      senha: this.senha,
    };

  
    await this.authService.createToken(newTokenRequest);
    await this.authService.getUser();
    
    this.router.navigate(['home/mapa']);


    


      
}



  
}
