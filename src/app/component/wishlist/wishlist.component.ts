import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WishlistService } from '../../service/wishlist.service';
 
import { ToastrService } from 'ngx-toastr';
import { Iwishlist } from '../../core/interface/iwishlist';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private readonly _WishlistService=inject(WishlistService);
  private readonly _CartService= inject(CartService);
  private readonly _ToastrService= inject(ToastrService)

  ngOnInit(): void {

    this.loadCart();
  }
  wishList:Iwishlist[]=[];
 loadCart(): void {
    this._WishlistService.Getloggeduserwishlist().subscribe({
      next: (res) => {
        console.log('Cart fetched successfully', res);
        this.wishList = res.data; // Ensure cartDetails is properly set
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
        if (err.status === 401) {
          alert('You are not authorized. Please log in.');
          // Optionally, redirect to the login page
        } else {
          alert('Failed to fetch cart. Please try again.');
        }
      }
    });
  }

  addcard(id_product: string) {
    const token = localStorage.getItem('token');
    
  
    this._CartService.addProductToCart(id_product).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message)
        
      },
      // error: (err) => {
      //   console.log(err);
      // },
    });
  }

  removeItem(id:string)
{
this._WishlistService.Removeproductfromwishlist(id).subscribe({next:(res)=>{console.log(res)
this.loadCart();
},
error:(err)=>{console.log(err)}})
}
homeDestory!: Subscription;
ngOnDestroy(): void {
  this.homeDestory?.unsubscribe();
}



}
