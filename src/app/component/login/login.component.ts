 
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  
  msgSuccess:boolean=false;
   msgError:string='';
   isloading :boolean= false

   loginForm:FormGroup = this._FormBuilder.group({
    
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
   

   } )

 

  loginSubmit():void{
     // logic
     if(this.loginForm.valid)
     {

      this.isloading = true;
      this._AuthService.setloginForm(this.loginForm.value).subscribe( {
        next:(res)=>{
        
          console.log(res);
          //  
          if(res.message=='success')
          {
            this.msgSuccess=true;
            setTimeout(()=>{

              localStorage.setItem('userToken' , res.token);
               //2-Dcode token

               this._AuthService.SaveUserData()
               //3- navigate to home
              this._Router.navigate(['/home'])

            },1000),
            this.isloading = false;
          }
          
          
        },
        error:(err:HttpErrorResponse)=>{
          this.isloading = false;
          this.msgError =err.error.message
          console.log(err);
          
        }
      })
      // console.log(this.loginForm.value);
     }
     else
     {
      this.loginForm.setErrors({mismatch:true})
      this.loginForm.markAllAsTouched();
      
      
     }
    
    
  }

}
