import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() lastPage: number = 1;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  pageNumber = 1;


  constructor() { }

  ngOnInit(): void {
  }

  next(): void {
    if (this.pageNumber === this.lastPage) return

    this.pageNumber++;
    this.pageChanged.emit(this.pageNumber);
  }

  previous(): void {
    if (this.pageNumber === 1) return

    this.pageNumber--;
    this.pageChanged.emit(this.pageNumber);
  }

}
