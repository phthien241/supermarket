import { Component } from '@angular/core';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent {
  imageUrl = "https://138100957.cdn6.editmysite.com/uploads/1/3/8/1/138100957/s537021412873084970_p421_i1_w886.png";
  name = "Devil's Lair Hidden Cave Chardonnay 750ml";
  price = 20.00;
  brands = ["Woolworths","Coles"]
  types = ["Fruit","Vegetables"]
  sortBy = ["A-Z","Z-A","Price Low to High","Price High to Low"]
}
