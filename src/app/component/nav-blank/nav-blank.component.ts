 
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
 
import { TranslateCompiler, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive , TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
 readonly _AuthService = inject(AuthService);
  private readonly _MytranslateService = inject(MytranslateService);
readonly _TranslateService = inject(TranslateService)


 
  change(lang:string):void{
    this._MytranslateService.changelang(lang)
    
  }

}
