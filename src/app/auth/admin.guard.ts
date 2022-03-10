import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { bombeiro } from '../models/bombeiro';import { MatSnackBar } from '@angular/material/snack-bar';

;

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  bombeiro? : bombeiro;
  constructor( private authService: AuthService, private snackbar: MatSnackBar){}
  canActivate(
    
     route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     

      if (this.authService.isAdmin()){
        return true
      }else{

     //   this.router.navigate(['/home/mapa'])
        this.snackbar.open('Apenas administradores', 'x', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'success'
        })
        return false;

      }

      
    
  }

  
  
}
