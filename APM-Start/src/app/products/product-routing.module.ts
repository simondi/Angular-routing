import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductResolver } from './product-resolver.service';
import { AuthGuard } from './../user/auth.guard';
import { ProductEditGuard } from './product-edit/product-edit.guard';


const routes: Routes = [
  {
    //Componentless route
      path: 'products',
      canActivate: [AuthGuard],
    // Children routes
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { resolvedData: ProductResolver }
      },
      {
        path: ':id/edit',
          component: ProductEditComponent,
          canDeactivate:  [ProductEditGuard],
        resolve: { resolvedData: ProductResolver },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProductEditInfoComponent },
          { path: 'tags', component: ProductEditTagsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
