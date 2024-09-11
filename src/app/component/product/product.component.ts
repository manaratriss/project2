import { Component, inject } from '@angular/core';
 
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
 
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
 
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
 
 
import { CategoresService } from '../../core/services/categores.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Icategories } from '../../core/interfaces/icategories';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,CurrencyPipe, UpperCasePipe,TermTextPipe, SearchPipe,CarouselModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private readonly _CategoresService = inject(CategoresService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  constructor(private _ProductService:ProductsService,private _CartService:CartService, private _toastrService:ToastrService){}

  productList:Iproduct[]=[];
  categoriesList:Icategories[]=[];
  isLoading:boolean=false
  text:string=''

  // categoriesList:Icategories[]=[];
  getAllProductSub!:Subscription;

  ngOnInit(): void {

    this._NgxSpinnerService.show('loading')
  
    this._CategoresService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList = res.data;
        this._NgxSpinnerService.hide('loading')
      },
      // error:(err)=>{
      //   console.log(err);
        
      // }
    })
  
  
     this.getAllProductSub= this._ProductService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.productList = res.data;
          
        },
        // error:(err)=>{
        //   console.log(err);
          
        // }
  
      })
  
      }
  
      ngOnDestroy(): void {
        this.getAllProductSub?.unsubscribe()
      }
     
  
      addCart(id:string){
      this.isLoading=true
      this._CartService.addProductToCart(id).subscribe({
        next:(res)=>{
         this._CartService.addProductToCart(res.numOfCartItems)
          
          console.log(res);
          this.isLoading=false
          this._toastrService.success(res.message , 'Fresh Cart')
          
        },
        error:(err)=>{
          console.log(err);
          this.isLoading=false
          
        }
      })
   }
  }
  


