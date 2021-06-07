import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissaoGuard implements CanActivate{

  constructor(private router:Router, private authService:AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
   return this.authService.verificarPermissao().pipe(
     tap(
       (b) =>{
         if(!b){
          this.router.navigateByUrl('/site/home')
         }
       }
     )
   )
  }
}
