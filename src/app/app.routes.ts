import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { BrandsComponent } from './component/brands/brands.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { DetailsComponent } from './component/details/details.component';
import { AllordersComponent } from './component/allorders/allorders.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { OrderComponent } from './component/order/order.component';

export const routes: Routes = [

    {path:'', component:AuthLayoutComponent,canActivate:[authGuard] ,children:[
        {path:'', redirectTo:'login' , pathMatch:'full'},
        {path:'login', component:LoginComponent},
        {path:'register' , component:RegisterComponent},
        {path:'foreget' , component:ForgetPasswordComponent}
    ]},

    {path:'' , component:BlankLayoutComponent,canActivate:[authGuard], children:[
        {path:'home' , component:HomeComponent},
        {path:'product' , component:ProductComponent},
        {path:'cart', component:CartComponent},
        {path:'brands', component:BrandsComponent},
        {path:'categories', component:CategoriesComponent},
         {path:'wishlist' , component:WishlistComponent},
       
        {path:'details/:id', component:DetailsComponent},
        {path:'allorders' , component:AllordersComponent},
        {path:'order/:id' , component:OrderComponent},
    ]},

    {path: '', component: NotfoundComponent}
];
