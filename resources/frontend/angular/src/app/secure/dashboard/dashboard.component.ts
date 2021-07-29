import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3'
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {

    const chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          ['x', '2021-1-1', '2021-2-2'],
          ['Sales', 20, 600]
        ],
        types: {
          Sales: 'bar'
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    });

    this.ordersService.chart().subscribe(data => {
      console.log(data);

      const dataArray = [['x'], ['Sales']]
      const columns = data.reduce((data: any, entry: any) => {
        data[0].push(entry.date);
        data[1].push(entry.sum);
        return data
      }, dataArray)
      console.log(columns);

      chart.load({
        columns: columns,
      });

    })
  }

}
