import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

import { Usuario } from './usuario';

@Injectable({providedIn:'root'})
export class AuthService {
  // readonly url =`${environment.API}/auth`
  readonly url =`${environment.API}`
  readonly usuariosPermissao =environment.usuariosPermissao
  usuarioSubject$:BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null)
  usuarioLogado$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  
  constructor(private http:HttpClient) {


 
   }

//Verifica o token vindo do backend após o login no IDP
  login():Observable<Usuario>{
     
    return this.http.get<Usuario>(`${this.url}/login/token`).pipe(
        tap(
          (u:Usuario)=>{
            if(u){
              // console.log("Dentro de login")
              // console.log(u)
              if(u.token){
                localStorage.setItem('token', u.token)
                this.usuarioSubject$.next(u)
                this.usuarioLogado$.next(true)
              }
            
            }
          
          }
        ),
        catchError(
          (err)=>{
            return of(null) 
          }
        )
      
      )
   }




   isAuthenticated():Observable<boolean>{
     const token =  localStorage.getItem('token')
      
    //  console.log(this.usuarioLogado$.value)
     if(token && !this.usuarioLogado$.value){
      // console.log("Verificando autenticado")
       return this.checkTokenValidation()
     }else{
      //  console.log("Entrei no false Verificando autenticação")
       this.login()
     }
     return this.usuarioLogado$.asObservable()
   }
  

  getUser():Observable<Usuario>{
    return this.usuarioSubject$.asObservable()
  }

  logout(){
    localStorage.removeItem('token')
    this.usuarioSubject$.next(null)
    this.usuarioLogado$.next(false)
  }

  verificarPermissao():Observable<boolean>{
   
   return this.usuarioSubject$.pipe(
      map(
        (u:Usuario)=>{
        if(u != null){
          return  this.usuariosPermissao.some((email)=>{
            if (email == u.email){
              // console.log("Deu certo usuario")
              return true
            }else{
              // console.log("Deu errado")
              return false
            }
         
          }
          )
        }
    
         
        }
      )
    )
    
  }
//Verifica se o token ainda é valido.
  checkTokenValidation():Observable<boolean>{
    return this.http.get<Usuario>(`${this.url}/login/usuario/`).pipe(
      tap(
        (u:any)=>{
          // if(!u[0]){
          //   this.login()
          // }
          // console.log("Checando token")
          // console.log(u)
          this.usuarioLogado$.next(true)
          this.usuarioSubject$.next(u[0])
          
          localStorage.setItem('token',u.token)
        }
      ),
      map(
        (u:any)=>{
          return (u[0])?true:false
        }
      ),
      catchError(
        (err)=>{
         
          // this.logout()
          return of(false)
        }
      )

    )
  }
}
