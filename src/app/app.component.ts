import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth/auth.service';
import { Usuario } from './auth/usuario';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loginapp';

  public authenticated$:Observable<boolean>
  public user$:Observable<Usuario>
  public permissao$:Observable<boolean>
  public logo:string =  environment.logo
  constructor( private router:Router, private authService:AuthService, private cookie:CookieService ){
   
    
  }
  ngOnInit(){
    this.authenticated$= this.authService.isAuthenticated()
    this.user$ = this.authService.getUser()
    this.permissao$ = this.authService.verificarPermissao()
    
  }

  logout(){
    
    this.authService.logout()
    console.log("Chamando logout")
    this.cookie.deleteAll()
    // this.router.navigateByUrl('/auth/login')
    // window.location.href =environment.callback
    window.location.href ="https://sistemas2.lages.ifsc.edu.br/api/login/logout/"
  }

}
