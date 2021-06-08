import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { FrameComponent } from './dashboard/home/frame/frame.component';
// import { ItemComponent } from './home/item/item.component';

const routes: Routes = [
  //chama o compoente Login 
  {path:'auth/login', component: LoginComponent},
  //chama o modulo dashboard, mostra apenas pra quem tem permissão.
  {path:'site', loadChildren: ()=>import('./dashboard/dashboard.module').then( m=> m.DashboardModule),  canActivate:[AuthGuard]},
  
  {path:'frame', component: FrameComponent},
  // {path:'', redirectTo:'site', pathMatch:'full'}
  {path:'', redirectTo:'auth/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy',  preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
