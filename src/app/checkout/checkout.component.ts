import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  showCheckout: boolean = false
 
  @Output() billPayed = new EventEmitter<any>()
  user: any // for user checkout information

  selectedProducts: any = []
  @ViewChild('buyBtn') buyBtn: ElementRef

  constructor(private checkoutService: CheckoutService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.selectedProducts = this.checkoutService.selectedProducts
    axios.get(`http://localhost:4600/users/id_${this.route.snapshot.params.id}`)
      .then( response => {
        this.user = this.checkoutService.user = response.data[0]
        this.showCheckout = true
      })
      .catch( err => console.log("Error in checkout: ", err))
  }


  returnCheck() {
    const add = (accumulator, currentValue) => accumulator + currentValue
    let prices = []
    this.selectedProducts.forEach(obj => {
      prices.push(obj['price'] * obj['amount'])
    })
    return prices.reduce(add, 0)
  }

  async buy() {
    if(this.checkoutService.user.balance < this.returnCheck()) {
      this.buyBtn.nativeElement.classList.remove('btn-dark')
      this.buyBtn.nativeElement.classList.add('btn-danger')
      this.buyBtn.nativeElement.innerText = 'No money'
      setTimeout( () => {
        this.buyBtn.nativeElement.classList.remove('btn-danger')
        this.buyBtn.nativeElement.classList.add('btn-dark')
        this.buyBtn.nativeElement.innerText = 'Buy'
      }, 1000) 
    }
    else {
      await axios.post(`http://localhost:4600/update/user/${this.checkoutService.user.userid}/balance/-/${this.returnCheck()}`)

      this.selectedProducts.forEach(product => {
        console.log('Treutni proizvod: ', product)
        axios.post(`http://localhost:4600/purchase/${this.checkoutService.user.userid}/${this.checkoutService.user.firstname}/${this.checkoutService.user.lastname}/${product.productid}/${product.name}/${product.type}/${product.price}/${product.amount}`)
        axios.post(`http://localhost:4600/update/user/${this.checkoutService.user.userid}/numofpurchases/+/${product.amount}`)
        axios.post(`http://localhost:4600/update/product/${product.productid}/${product.type}/${product.price}/${product.amount}`)
      })

      this.buyBtn.nativeElement.classList.remove('btn-dark')
      this.buyBtn.nativeElement.classList.add('btn-success')
      this.buyBtn.nativeElement.innerText = 'Bill payed'
      setTimeout( () => {
        this.buyBtn.nativeElement.classList.remove('btn-success')
        this.buyBtn.nativeElement.classList.add('btn-dark')
        this.buyBtn.nativeElement.innerText = 'Buy'
      }, 1000) 

      this.billPayed.emit()

      this.selectedProducts = this.checkoutService.selectedProducts = []

    }
  }

  reduce(productid) {
    if(this.selectedProducts.find(x => x.productid === productid).amount === 1) {
      this.selectedProducts.splice(this.selectedProducts.indexOf(this.selectedProducts.find(x => x.productid === productid)), 1 )
    }
    else 
      this.checkoutService.selectedProducts.find(x => x.productid === productid).amount -= 1

  }
}
