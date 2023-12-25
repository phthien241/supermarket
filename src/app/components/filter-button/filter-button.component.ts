import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent {
  @Input() buttonName: string = 'Sort By';
  @Input() dropdownOptions: string[] = []; 
  @Input() dropdownID: string ="";

  @Output() optionSelected: EventEmitter<string> = new EventEmitter();

  onSelect(option: string) {
    this.optionSelected.emit(option);
  }
}
