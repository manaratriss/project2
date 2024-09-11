import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  // myheaders:any={Token: localStorage.getItem('usertoken')};

  constructor(private readonly _HttpClient:HttpClient) { }

  AddProductToWishList(id:string):Observable<any> 
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        'productId':id
      },

      // {
      //   headers:this.myheaders
      // }
    )
}

Getloggeduserwishlist():Observable<any> 
{
return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist',
// {headers:this.myheaders}
)
}
Removeproductfromwishlist(id:string):Observable<any> 
  {
return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
// {
//   headers:this.myheaders
// }
)

}
}
