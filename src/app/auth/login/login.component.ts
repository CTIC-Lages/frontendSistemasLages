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
    this.authService.isAuthenticated()
    this.authService.login().subscribe(
      (u) =>{
        // console.log("chamadno login")
        // console.log(u)
        if (u == null){
          console.log()
          // this.router.navigateByUrl('/site/home')
          // window.location.href ="https://sistemas2.lages.ifsc.edu.br/api/login/logout/"
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
