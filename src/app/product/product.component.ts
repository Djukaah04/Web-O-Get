import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { CheckoutService } from '../checkout/checkout.service';
import axios from 'axios';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: any
  @ViewChild('productDiv') productDiv: ElementRef
  @ViewChild('productImg') productImg: ElementRef
  imgUrl: string
  clicked: boolean = false

  productsBuyers: any[] = [] // For the admin view

  constructor(private productsService: ProductsService,
              private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.imgUrl = this.productsService.products.find( x => x.name === this.product.name ).url
    
    axios.get(`http://localhost:4600/purchase/product/${this.product.productid}`)
      .then( response => {
        if(response.data[0]){
          this.productsBuyers = response.data
        }
      }) 
  }

  productClickedOn() {
    if(this.checkoutService.selectedProducts.find( x => x.productid === this.product.productid ) !== undefined)
      this.checkoutService.selectedProducts.find( x => x.productid === this.product.productid ).amount += 1
    else {
      this.product['amount'] = 1
      this.checkoutService.selectedProducts.push(this.product)  
    }
    this.productDiv.nativeElement.classList.add('clicked')
    var counter = setTimeout( ()=> {
      this.productDiv.nativeElement.classList.remove('clicked')
    }, 100)
  }

}
