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
  ngOnInit(){
    console.log(this.dropdownID);
  }
  selectedOption: string | null = null;

  onSelect(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
  }
}
