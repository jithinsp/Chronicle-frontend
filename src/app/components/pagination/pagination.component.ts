import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalItems: any;
  @Input() currentPage: any;
  @Input() itemsPerPage: any;
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  totalPages = 0;
  pages:number[] =[];

  constructor(){

  }

  ngOnInit(): void {
    if(this.totalItems){
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array.from({length: this.totalPages}, (_,i) => i+1);
    }
  }

  pageClicked(page: number){
    this.onClick.emit(page);
  }

}
