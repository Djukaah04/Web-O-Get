import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  // For the admin options
  isAdmin: boolean = false
  // productsBuyers: any[] = []

  // For the CheckoutComponent
  selectedProducts: any = []
  user: any;

  // For the PurchasesComponent
  usersPurchases: any = []

  constructor() {}

}
