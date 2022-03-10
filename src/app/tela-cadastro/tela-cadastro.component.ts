import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute  } from '@angular/router';
import { BombeirosService } from '../services/bombeiro.service';
import 'ol/ol.css';
import 'ol/ol.css';
import { bombeiro } from '../models/bombeiro';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-tela-home',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.scss']
})

export class TelaCadastroComponent implements OnInit {
  

  constructor(private route: ActivatedRoute, 
    private bombeiroService: BombeirosService, 
    private snackbar: MatSnackBar) { }
  
  subscription: any;

  edit = false;
 
  
ngOnInit(){

   

  }
  bombeiro?: bombeiro;

  


  cadastroForm = new FormGroup({

    nome: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    nomeDeGuerra: new FormControl(''),
    matricula: new FormControl('', [Validators.required]),
    perfilAcesso: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    
  });

  private async update(){
    try{
      const bombeiroUp = await this.bombeiroService.update(this.bombeiro!.id!, this.bombeiro!);
      this.snackbar.open('Bombeiro atualizado com sucesso', 'x',{
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'success'

      })
      return bombeiroUp;
    }catch(error){
      this.snackbar.open('Não foi possivel atualizar o bombeiro', 'x', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'warn',
      })
      throw error;
    }
  }

   async enviar(){
     await this.bombeiroService.create(this.cadastroForm.value);
      this.cadastroForm.reset();
     this.snackbar.open('Bombeiro criado com sucesso', 'x', {
             horizontalPosition: 'center',
             verticalPosition: 'bottom',
             panelClass: 'success'
           })
   }

  




  }
