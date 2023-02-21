import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './modules/customers/customers.component';
import { LoginComponent } from './modules/login/login.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { ProductsComponent } from './modules/products/products.component';
import { RegisterComponent } from './modules/register/register.component';
import { SellersComponent } from './modules/sellers/sellers.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./starter/starter.module').then((m) => m.StarterModule),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
