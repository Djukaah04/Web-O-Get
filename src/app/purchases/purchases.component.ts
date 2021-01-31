import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { CheckoutService } from '../checkout/checkout.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  user: any

  showPurchases: boolean = false
  showPurchaseTitle: boolean = false
  usersPurchases: any = []

  totalMoneySpent: number = 0

  purchaseUrls: string [] = []

  constructor(private checkoutService: CheckoutService,
              private productsService: ProductsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('ngInit Pruchases')
    axios.get(`http://localhost:4600/users/id_${this.route.snapshot.params.id}`)
    .then( response => {
      this.user = response.data[0]
      this.showPurchaseTitle = true
      console.log('got User')
      axios.get(`http://localhost:4600/purchase/${this.route.snapshot.params.id}`)
      .then( response => {
          this.usersPurchases = this.checkoutService.usersPurchases = response.data
          this.usersPurchases.forEach( purchase => {
            this.purchaseUrls.push(this.productsService.products.find(x => x.name === purchase.name).url)
            })
          this.showPurchases = true
          console.log('got purchases')
          }
        )
      }
    )
    .catch( err => console.log('Error in getting users purchases: ', err))
  }

  returnTotalMoneySpent() {
    const add = (accumulator, currentValue) => accumulator + currentValue
    let prices = []
    this.usersPurchases.forEach(obj => {
      prices.push(obj['price'] * obj['amount'])
    })
    return prices.reduce(add, 0)
  }
}
