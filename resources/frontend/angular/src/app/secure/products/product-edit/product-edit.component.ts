import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productForm = this.formBuilder.group({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  id!: number;

  constructor(
    protected formBuilder: FormBuilder,
    private productsService: ProductsService,
    protected router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    const product = this.productsService.getByID(this.id).subscribe(product => {
      this.productForm.patchValue(product)
    })

  }

  editProductSubmit(): void {
    this.productsService.update(this.id, this.productForm.getRawValue()).subscribe(product => {
      this.router.navigate(['/products']);
    });
  }

  imageUploaded(url: string): void {
    this.productForm.patchValue({
      image: url
    })
  }

}
