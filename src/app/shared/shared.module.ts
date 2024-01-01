import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../screen/nav-bar/nav-bar.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { IntroductionCardComponent } from '../components/introduction-card/introduction-card.component';
import { FilterButtonComponent } from '../components/filter-button/filter-button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavBarComponent,
    ProductCardComponent,
    IntroductionCardComponent,
    FilterButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NavBarComponent,
    ProductCardComponent,
    IntroductionCardComponent,
    FilterButtonComponent,
    FormsModule
  ]
})
export class SharedModule { }
