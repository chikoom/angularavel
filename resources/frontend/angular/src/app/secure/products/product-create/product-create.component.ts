import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm = this.formBuilder.group({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  constructor(
    protected formBuilder: FormBuilder,
    private productsService: ProductsService,
    protected router: Router,
  ) { }

  ngOnInit(): void {
  }

  createProductSubmit(): void {

    this.productsService.create(this.productForm.getRawValue()).subscribe(product => {
      this.router.navigate(['/products']);
    });
  }

  imageUploaded(url: string): void {
    this.productForm.patchValue({
      image: url
    })
  }

}
