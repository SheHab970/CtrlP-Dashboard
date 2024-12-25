import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/authentication/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/authentication/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivate: [authGuard],
    children: [
      ///orders
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./modules/pages/orders-list/orders-list.component').then(
            (c) => c.OrdersListComponent
          ),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./modules/pages/serv-ices/serv-ices.component').then(
            (c) => c.ServIcesComponent
          ),
      },
      {
        path: 'services/add-service',
        loadComponent: () =>
          import('./modules/pages/add-service/add-service.component').then(
            (c) => c.AddServiceComponent
          ),
      },
      {
        path: 'services/edit-service/:id',
        loadComponent: () =>
          import('./modules/pages/update-service/update-service.component').then(
            (c) => c.UpdateServiceComponent
          ),
      },

      {
        path: 'orders/order-detials/:id',
        loadComponent: () =>
          import('./modules/pages/order-details/order-details.component').then(
            (c) => c.OrderDetailsComponent
          ),
      },

      // !Product
      {
        path: 'Product',
        loadComponent: () =>
          import('./modules/pages/products-list/products-list.component').then(
            (c) => c.ProductsListComponent
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
        path: 'Product/editProduct/:id',
        loadComponent: () =>
          import('./modules/pages/edit-product/edit-product.component').then(
            (c) => c.EditProductComponent
          ),
      },

      //  *categories
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
        path: 'categories/editCategory/:id',
        loadComponent: () =>
          import('./modules/pages/editcat/editcat.component').then(
            (c) => c.EditcatComponent
          ),
      },

      // ^user
      {
        path: 'user',
        loadComponent: () =>
          import('./modules/pages/users/users.component').then(
            (c) => c.UsersComponent
          ),
      },

      // & massage

      {
        path: 'message',
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
