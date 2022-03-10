import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// ↓ Telas do projeto ↓
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaHomeComponent } from './tela-home/tela-home.component';
import { TelaConfigComponent } from './tela-relatorio/tela-relatorio.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaMapaComponent } from './tela-mapa/tela-mapa.component';
// ↓ Bootstrap importação ↓
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

// ↓ Angular Material importação ↓
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs'; 

// ↓ Serviços de autenticação ↓
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    TelaHomeComponent,
    TelaConfigComponent,
    TelaCadastroComponent,
    TelaMapaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    MatToolbarModule,
    MatSidenavModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true,},
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true,},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration:2500}}
    ],
  bootstrap: [AppComponent]

})
export class AppModule { }
