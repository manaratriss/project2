import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
 
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
 
import { ToastRef, ToastrService } from 'ngx-toastr';
 
import { log } from 'console';
 
import { NgxSpinnerService } from 'ngx-spinner';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CategoresService } from '../../core/services/categores.service';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Icategories } from '../../core/interfaces/icategories';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CurrencyPipe, UpperCasePipe,TermTextPipe,SearchPipe, CarouselModule, FormsModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  private readonly _CategoresService = inject(CategoresService)

  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  constructor(private _ProductService:ProductsService,private _CartService:CartService,private _toastrService: ToastrService){}

  productList:Iproduct[]=[];

  isLoading:boolean=false
  text:string=''

  categoriesList:Icategories[]=[];
  getAllProductSub!:Subscription;


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    dots: true,
    rtl:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    dots: false,
    rtl:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }


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



 