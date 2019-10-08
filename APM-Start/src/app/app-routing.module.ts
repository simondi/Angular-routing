import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStratege } from './selective-stratege.service';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    {
        path: 'products',
        canActivate: [AuthGuard],  // Changed from canActivate for laziloadding; canActivate for Preloading
        data: {preload:true},
        loadChildren: () =>
            import('./products/product.module').then (m=>m.ProductModule)
    },
  { path: 'home', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]; { PreloadingStrategy: SelectiveStratege }   // could be PreloadAllModules


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing : false }),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
