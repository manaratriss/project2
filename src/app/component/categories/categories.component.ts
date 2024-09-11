import { Component, inject, OnDestroy, OnInit } from '@angular/core';
 
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoresService } from '../../core/services/categores.service';
import { Icategories } from '../../core/interfaces/icategories';
 

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [UpperCasePipe,FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy{
  private readonly _CategoresService = inject(CategoresService)
  categoriesList:Icategories[]=[];
  getAllcategoriestSub!:Subscription;
  isLoading:boolean=false;
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  ngOnInit(): void {

    // this._NgxSpinnerService.show('loading')
  
    this._CategoresService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList = res.data;
        // this._NgxSpinnerService.hide('loading')
      },
      // error:(err)=>{
      //   console.log(err);
        
      // }
    })

    this.getAllcategoriestSub= this._CategoresService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList = res.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }

    })

    

    }

    ngOnDestroy(): void {
      this.getAllcategoriestSub?.unsubscribe()
    }
}

