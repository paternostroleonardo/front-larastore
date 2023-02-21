import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { SellersComponent } from './modules/sellers/sellers.component';
import { CustomersComponent } from './modules/customers/customers.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { BaseComponent } from './shared/base/base.component';
import { RegisterComponent } from './modules/register/register.component';

const appRoutes: Routes = [
  {path:'login', component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SellersComponent,
    CustomersComponent,
    OrdersComponent,
    BaseComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
