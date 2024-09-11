import { OrdersService } from './../../core/service/orders.service';
import { Subscription } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  cartId:string | null = "";
  private readonly _ActivateRoute = inject(ActivatedRoute)

  private readonly _OrdersService = inject(OrdersService)

  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  })


  ordersSbumit():void{
    console.log(this.orders.value);
    this._OrdersService.checkOut(this.cartId , this.orders.value).subscribe({
      next:(res)=>{
        console.log(res)

        if(res.status === 'success' ){
          // res.session.url
          window.open(res.session.url , '_self')
        }
      },
      error:(err)=>{
        console.log(err);
         
        
      }
    })
    
  }
  

  ngOnInit(): void {
    this._ActivateRoute.paramMap.subscribe({
      next:(params)=>{
       this.cartId = params.get('id')

       console.log(this.cartId);
       

      }
    })
  }

}
