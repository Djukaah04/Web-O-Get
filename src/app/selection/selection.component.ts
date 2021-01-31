import { Component, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  products: any = [];
  showSelection: boolean = false;
  allTypes: string[] = []

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProductsByType()

  }

  getAllProductsByType() {
    axios.get('http://localhost:4600/products_by_type')
      .then(response => {
        this.products = response.data

        this.products.forEach(obj => {
          if(!this.allTypes.includes(obj['type']))
            this.allTypes.push(obj['type']) 
        });
        console.log('All types: ', this.allTypes)
        this.showSelection = true
      })
      .catch(error => {
        console.log(error)
      })
  }
}
