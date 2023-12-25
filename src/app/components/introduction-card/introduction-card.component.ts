import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-introduction-card',
  templateUrl: './introduction-card.component.html',
  styleUrls: ['./introduction-card.component.scss']
})
export class IntroductionCardComponent {
  @Input() image: string;
  @Input() description: string;
}
