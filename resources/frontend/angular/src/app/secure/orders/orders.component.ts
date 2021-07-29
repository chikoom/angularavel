import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('tableState', [
      state('show', style({ maxHeight: '150px' })),
      state('hide', style({ maxHeight: '0' })),
      transition('show => hide', animate('1000ms ease-in')),
      transition('hide => show', animate('1000ms ease-out')),
    ])
  ]
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  lastPage = 1;
  selectedRow = 0;

  constructor(private oredersService: OrdersService) { }

  ngOnInit(): void {
    this.load();
  }

  load(pageNumber = 1): void {
    this.oredersService.all(pageNumber).subscribe(res => {
      this.orders = res.data;
      this.lastPage = res.meta.last_page
    })
  }

  select(id: number): void {
    this.selectedRow = this.selectedRow === id ? 0 : id;
  }

  tableState(id: number): string {
    return (this.selectedRow === id) ? 'show' : 'hide';
  }

  export() {
    this.oredersService.export().subscribe(
      data => {

        const downloadURL = window.URL.createObjectURL(data);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadURL;
        downloadLink.download = 'orders.csv';
        downloadLink.click();

      },
      (err: any) => { console.log(err) }
    )
  }

}
