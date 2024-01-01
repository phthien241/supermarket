import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowsePageRoutingModule } from './browse-page-routing.module';
import { BrowsePageComponent } from './browse-page/browse-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BrowsePageComponent,
  ],
  imports: [
    CommonModule,
    BrowsePageRoutingModule,
    SharedModule
  ]
})
export class BrowsePageModule { }
