import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private fb:FormBuilder, private authService:AuthService, private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
   //caso é identificado que o usuário não está conectado, é redirecionado para este o módulo o qual verifica o login. 
   //caso se tiver logado, redireciona para a home. Senão manda para o backend
    this.authService.login().subscribe(
      (u) =>{
        // console.log("chamadno login")
        // console.log(u)
        if (u == null){
       
          window.location.href =environment.callback
        }else{
           this.router.navigateByUrl('/site/home')
        }
       
        
      },
      error =>{
        console.log(error)
        window.location.href =environment.callback
      }
    ) 
    
    
  }



}
