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
        path: 'addProduct',
        loadComponent: () =>
          import('./modules/pages/add-product/add-product.component').then(
            (c) => c.AddProductComponent
          ),
      },

      {
          path: 'orders/order-detials',
          loadComponent: () =>
            import('./modules/pages/order-details/order-details.component').then(
              (c) => c.OrderDetailsComponent
            ),
      },
      {
        path: 'Product',
        loadComponent: () =>
          import('./modules/pages/products-list/products-list.component').then(
            (c) => c.ProductsListComponent
          ),
      },

      {
        path: 'user',
        loadComponent: () =>
          import('./modules/pages/users/users.component').then(
            (c) => c.UsersComponent
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./modules/pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'addCategory',
        loadComponent: () =>
          import('./modules/pages/add-category/add-category.component').then(
            (c) => c.AddCategoryComponent
          ),
      },

      {
        path: 'massage',
        loadComponent: () =>
          import('./modules/pages/massage/massage.component').then(
            (c) => c.MassageComponent
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
