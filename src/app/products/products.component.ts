import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  showProducts: boolean = false;
  productsOfType: any = []

  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.route.params.subscribe(
      (data => {
        axios.get(`http://localhost:4600/products_by_type/type_${data.type}`)
        .then(response => {
          this.productsOfType = response.data
          console.log(data.type, 'products:', this.productsOfType)
          this.showProducts = true
        })
        .catch(error => {
          console.log(error)
        })
      })
    )
  }

}
