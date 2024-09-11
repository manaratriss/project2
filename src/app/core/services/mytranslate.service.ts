import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
  private readonly _platId = inject(PLATFORM_ID);
  private readonly _TranslateService = inject(TranslateService)
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null , null);


  constructor() { 



   if(isPlatformBrowser(this._platId)){
    // let savedlang = localStorage.getItem('lang');

    this._TranslateService.setDefaultLang('en');

   this.setLang()

   }

   
   
  }

   
  //////////////////////

  setLang():void{

    let savedlang = localStorage.getItem('lang');

    if(savedlang ! == null){
      this._TranslateService.use(savedlang !);
     }

    if(savedlang === 'en'){
      // document.documentElement.dir= 'ltr';

      this._Renderer2.setAttribute(document.documentElement , 'dir' , 'ltr')
      this._Renderer2.setAttribute(document.documentElement , 'lang' , 'en')
   }
   else if(savedlang === 'ar')
   {
      // document.documentElement.dir= 'rtl';
      this._Renderer2.setAttribute(document.documentElement , 'dir' , 'rtl')
      this._Renderer2.setAttribute(document.documentElement , 'lang' , 'ar')
   }
  }


  ////////////////
  changelang(lang:string):void{
    if(isPlatformBrowser(this._platId)){
      localStorage.setItem('lang' , lang);

       this.setLang()
    }
  }
}
