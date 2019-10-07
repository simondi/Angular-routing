import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../messages/message.service';

import { Product, ProductResolved } from '../product';
import { ProductService } from '../../services/product.service';
import { LoggerService } from './../../services/logger.services';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  pageTitle = 'Product Edit';
  errorMessage: string;

    private dataIsValid: { [key: string]: boolean } = {};
    private currentProduct: Product;
    private originalProduct: Product;

    get product(): Product {
        return this.currentProduct;
    }

    set product(value: Product)  {
        this.currentProduct = value;
        // clone the object to return a copy
        this.originalProduct = { ...value };
    }

    get isDirty(): boolean {
        return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
    }

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private loggerService: LoggerService
  ) { }

  ngOnInit(): void {

   // const id = +this.route.snapshot.paramMap.get('id');
    // this.getProduct(id);

    //this.route.paramMap.subscribe(
    //  params => {
    //    const id = +params.get('id');
    //    this.getProduct(id);
    //  }
    //)

    //const resolvedData: ProductResolved = this.route.snapshot.data['resolvedData'];
    //this.errorMessage = resolvedData.error;
    //this.onProductRetrieved(resolvedData.product);

    //using observable for changing parameters
    this.route.data.subscribe(data => {
        const resolvedData: ProductResolved = data['resolvedData'];
        this.errorMessage = resolvedData.error;
        this.onProductRetrieved(resolvedData.product);
      })
    }

    reset() {
        this.dataIsValid = null;
        this.currentProduct = null;
        this.originalProduct = null;
    }

  //getProduct(id: number): void {
  //  this.productService.getProduct(id).subscribe({
  //    next: product => this.onProductRetrieved(product),
  //    error: err => this.errorMessage = err
  //  });
  //}

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  saveProduct(): void {
    if (true === true) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
      }
      this.reset();
    this.router.navigate(['/products'], { queryParamsHandling: "preserve" });
    // Navigate back to the product list with preserved / preserve parameter.
    this.loggerService.log("Logging a message: "+message);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.product.category &&
      this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
