import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // myToken:any= {'token':localStorage.getItem('userToken')
  
  constructor(private _HttpClient:HttpClient) {
  }

  
  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{
      "productId":productId
    },

    {
      // headers:this.myToken
    

    })
  }

  updateProductQuantity(productId:string,pCount:string):Observable<any>{
    return this._HttpClient.put( 'https://ecommerce.routemisr.com/api/v1/cart/'+productId,
      {
        "count":pCount
      },
      // {
      //   headers:this.myToken
      // }
    )
  }

  getCart():Observable<any>{
    return this._HttpClient.get(' https://ecommerce.routemisr.com/api/v1/cart',
      // {
      //   headers:this.myToken
      // }
    )
  }

  removeSpecItem(pId:string):Observable<any>{
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart/'+pId,
      // {
      //   headers:this.myToken

      // }
    )
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart',
      // {
      //   headers:this.myToken
      // }
    )
  }
}
 