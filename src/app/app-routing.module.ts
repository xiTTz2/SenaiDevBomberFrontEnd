import { TelaMapaComponent } from './tela-mapa/tela-mapa.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaConfigComponent } from './tela-relatorio/tela-relatorio.component';
import { TelaHomeComponent } from './tela-home/tela-home.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  
  {path: 'login',  component: TelaLoginComponent, },
  {path: 'home', component: TelaHomeComponent,  canActivate: [AuthGuard],
  children: [
    {path: 'mapa', component: TelaMapaComponent},
    {path: 'cadastro', component: TelaCadastroComponent,  canActivate: [AdminGuard]
  },
    {path: 'relatorio', component: TelaConfigComponent},
    {path: '',  component: TelaHomeComponent},
  ]
},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
