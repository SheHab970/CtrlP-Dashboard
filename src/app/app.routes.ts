import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    children: [
      {
        path: 'orders',
        loadComponent: () =>
          import('./modules/pages/orders-list/orders-list.component').then(
            (c) => c.OrdersListComponent
          ),
      },
      {
        path: 'Product',
        loadComponent: () =>
          import('./modules/pages/products-list/products-list.component').then(
            (c) => c.ProductsListComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
