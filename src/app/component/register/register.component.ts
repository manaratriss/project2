import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
 
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  
  msgSuccess:boolean=false;
   msgError:string='';
   isloading :boolean= false

   registerForm:FormGroup = this._FormBuilder.group({
    name: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
   rePassword: [null],
    phone: [null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],

   },{validators:this.confirmPassword})

//validators
  // registerForm:FormGroup = new FormGroup({

  //   name: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),

  //   email: new FormControl(null, [Validators.required, Validators.email]),

  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),

  //   rePassword: new FormControl(null),

  //   phone: new FormControl(null ,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])

  // }, this.confirmPassword); //{}
 


  confirmPassword(g: AbstractControl)
  {
      if(g.get('password')?.value === g.get('rePassword')?.value)
      {
        return null

      }
      else{
        return{mismatch:true}
      }
        
  }

  


  registerSub !: Subscription

  dataForm = {
    name: 'manar',
    email:'manarmahommed75@gmail.com',
    phone:'01023962872',
    password:'102030',
    rePassword:'102030'
  }

  ngOnInit(): void{
    this.registerForm.patchValue({
      name: this.dataForm.name,
      email: this.dataForm.email,
      phone:this.dataForm.phone,
      password:this.dataForm.password,
      rePassword: this.dataForm.rePassword

    })
  }


  registerSubmit():void{
     // logic
     if(this.registerForm.valid)
     {

      this.isloading = true;
     this.registerSub = this._AuthService.setRegisterForm(this.registerForm.value).subscribe( {
        next:(res)=>{
        
          console.log(res);
          //  
          if(res.message=='success')
          {
            this.msgSuccess=true;
            setTimeout(()=>{
              this._Router.navigate(['/login'])

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
      // console.log(this.registerForm.value);
     }
     else
     {
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched();
      
      
     }
    
    
  }

  ngOnDesrtoy():void{
    this.registerSub?.unsubscribe()
  }

}
