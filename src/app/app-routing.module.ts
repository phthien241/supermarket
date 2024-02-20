import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ErrorComponent } from './screen/error/error.component';
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
    loadChildren: () => import('./screen/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'confirm',
    loadChildren: () => import('./screen/confirm-cart/confirm-cart.module').then(m => m.ConfirmCartModule),
    canActivate: [MsalGuard]
  },
  {
    path: '',
    loadChildren: () => import('./screen/home-page/home-page.module').then(m => m.HomePageModule)
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
