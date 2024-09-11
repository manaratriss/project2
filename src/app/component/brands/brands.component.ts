import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Ibrands } from '../../core/interface/ibrands';
import { BrandsService } from '../../core/services/brands.service';
import { Subscriber, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {
brandsLists: Ibrands[]=[];
private readonly _BrandsService = inject(BrandsService)
getAllbrandsSub!:Subscription;



ngOnInit(): void {

  

  this._BrandsService.getAllbrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.brandsLists = res.data;
       
    },
    // error:(err)=>{
    //   console.log(err);
      
    // }
  })

  this.getAllbrandsSub= this ._BrandsService .getAllbrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.brandsLists = res.data;
      
    },
    error:(err)=>{
      console.log(err);
      
    }

  })

  

  }

  ngOnDestroy(): void {
    this.getAllbrandsSub?.unsubscribe()
  }
}

 
