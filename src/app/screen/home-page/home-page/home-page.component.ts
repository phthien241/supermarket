import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  imageUrl = "https://138100957.cdn6.editmysite.com/uploads/1/3/8/1/138100957/s537021412873084970_p421_i1_w886.png";
  name = "Devil's Lair Hidden Cave Chardonnay 750ml";
  price = 20.00;
  ngOnInit(){
    
  }
}
