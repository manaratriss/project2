import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
//  myheaders: any = {Token : localStorage.getItem('userToken')}
  constructor(private _HttpClient:HttpClient) { }

  checkOut(idcart:string |null , shippingDetails:object):Observable<any> {
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/ ${idcart}?url=http://localhost:4200/`,
    {
      "shippingAddress":shippingDetails
   
 },
//  {
//   headers: this.myheaders
//  }
   )
   
}
}
