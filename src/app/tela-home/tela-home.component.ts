
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { bombeiro } from '../models/bombeiro';

@Component({
  selector: 'app-tela-home',
  templateUrl: './tela-home.component.html',
  styleUrls: ['./tela-home.component.scss']
})

export class TelaHomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  bombeiros?: bombeiro;

  isVisible: boolean = true;
  
   ngOnInit() {
     this.bombeiros = this.authService.getUser();
     if(this.authService.isAdmin())
     {
      this.isVisible = true;
     }else{
      this.isVisible = false;
     }
   }
   

  showFiller = false;

  @ViewChild("block") block!: ElementRef;
 

   


   logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
    
    }
  

  }  
