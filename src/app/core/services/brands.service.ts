import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _HttpClient = inject(HttpClient)
  getAllbrands():Observable<any>
{
  return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
}

getSpecificbrands(id:string | null):Observable<any>
{
  return this._HttpClient.get( `https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  
}
}
