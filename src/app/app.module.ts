import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductsComponent } from './products/products.component';
import { SelectionComponent } from './selection/selection.component';
import { ProductComponent } from './product/product.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ImgHoverDirective } from './product/img-hover.directive';
import { PurchasesComponent } from './purchases/purchases.component';
import { DashedSelectionDirective } from './home/dashed-selection.directive';
const Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home/:id', component: HomeComponent, children: [
      {
        path: ':type', component: ProductsComponent
      },
      {
        path: '', component: PlaceholderComponent
      }
    ]
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ProductsComponent,
    SelectionComponent,
    ProductComponent,
    PlaceholderComponent,
    CheckoutComponent,
    ImgHoverDirective,
    PurchasesComponent,
    DashedSelectionDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
