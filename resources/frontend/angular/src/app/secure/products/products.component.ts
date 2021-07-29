import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  lastPage = 1;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.load()
  }

  load(pageNumber = 1) {
    this.productsService.all(pageNumber).subscribe(res => {
      this.lastPage = res.meta.last_page;
      this.products = res.data;
    })
  }

  deleteProduct(productID: number): void {
    if (confirm(`Are you sure you want to delete this Product`)) {
      this.productsService.delete(productID).subscribe(() => {
        this.products = this.products.filter((product: Product) => product.id !== productID)
      })
    }
  }

  sort(criteria: string): void {
    this.products = this.products.sort((productA: any, productB: any) => `${productA[criteria]}`.localeCompare(`${productB[criteria]}`));
  }

}
