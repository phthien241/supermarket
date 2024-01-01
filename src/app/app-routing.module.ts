import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalRedirectComponent } from '@azure/msal-angular';

const routes: Routes = [
  
  { 
    path: 'login', 
    loadChildren: () => import('./screen/login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'sign-up', 
    loadChildren: () => import('./screen/sign-up/sign-up.module').then(m => m.SignUpModule) 
  },
  { 
    path: 'shop/browse/:filter', 
    loadChildren: () => import('./screen/browse-page/browse-page.module').then(m => m.BrowsePageModule) 
  },
  { 
    path: 'cart', 
    loadChildren: () => import('./screen/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) 
  },
  {
    path:'',
    loadChildren: () => import('./screen/home-page/home-page.module').then(m => m.HomePageModule) 
  }
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
