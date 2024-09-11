 
import { Component } from '@angular/core';
 
import { ToastrService } from 'ngx-toastr';
 
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  myCart:Icart = {} as Icart
  constructor(private _CartService: CartService ,private toastr: ToastrService){}

  ngOnInit(){
    if( typeof localStorage !=='undefined'){
      localStorage.setItem('currentPage','/cart')
    }

    this._CartService.getCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.myCart=res
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }


  updateQuantity(pId:string,pCount:number){
    this._CartService.updateProductQuantity(pId,pCount.toString()).subscribe({
      next:(res)=>{
        console.log(res);
        this.myCart=res
        this.toastr.success(" Cart updated");
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

  removeItem(pId:string){
    this._CartService.removeSpecItem(pId).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.myCart=res
        this.toastr.error("Item Deleted")
        
      },
      error:(err)=>{
        console.log(err);
        
    }
})
}


clearItem():void{
  this._CartService.clearCart().subscribe({
    next:(res)=>{
     console.log(res);
     if(res.message == 'success'){
        this.myCart = {} as Icart;
     }
     
    },
    error:(err)=>{
      console.log(err);
      
        
    }
  })
}
}
