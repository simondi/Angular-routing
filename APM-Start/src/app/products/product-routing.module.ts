import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';


const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'productDetail', component: ProductDetailComponent },
  { path: 'productEdit', component: ProductEditComponent },
  { path: 'products/:id', component: ProductListComponent },
  { path: 'products/:id/edit', component: ProductListComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
