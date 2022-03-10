import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.snackbar.open('campos incorretos', 'x',{
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success'
   
          })
          this.authenticationService.logout();
          this.router.navigate(['login']);

          
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
