import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { CheckoutService } from '../checkout/checkout.service';

@Directive({
  selector: '[appImgHover]'
})
export class ImgHoverDirective {

  imgUrl: string

  img: any
  @Input() timesBought: number
  @Input() productImg
  @Input() productDiv

  @Input() productsBuyers: any[] = []
  constructor(private host: ElementRef,
              private checkoutService: CheckoutService,
              private route: ActivatedRoute) { }

  @HostListener('mouseover') hovered = () => {
    this.host.nativeElement.style.cursor = 'default'

    this.productDiv.childNodes[0].remove()

    var placeholder = document.createElement('div')

    placeholder.style.width = '170px'
    placeholder.style.height = '170px'
    placeholder.style.display = 'flex'
    placeholder.style.flexDirection = 'column'
    placeholder.style.alignItems = 'center'
    placeholder.style.justifyContent = 'center'
    this.productDiv.insertBefore(placeholder, this.productDiv.childNodes[0])

    let div = document.createElement('div')
    let p = document.createElement('p')
    p.style.fontSize = '30px'
    p.innerText = `${this.timesBought} units sold!`
    div.appendChild(p)
    placeholder.appendChild(div)

    if(this.checkoutService.isAdmin || this.route.pathFromRoot[1].snapshot.params.id == 1){
      div =  document.createElement('div')
      div.style.display = 'flex'
      div.style.flexDirection = 'column'
      div.style.alignItems = 'center'
      div.style.justifyContent = 'center'
      this.productsBuyers.forEach(buyer => {
        p = document.createElement('p')
        p.style.margin = '0'
        p.style.fontSize = '20px'
        p.innerHTML = `${buyer.firstname} ${buyer.lastname} ${buyer.amount}`
        div.appendChild(p)
      })

      placeholder.appendChild(div)
    }

    console.log(placeholder.childNodes)

  }
  @HostListener('mouseleave') left = () => {
    this.productDiv.childNodes[0].remove()
    this.productDiv.insertBefore(this.productImg, this.productDiv.childNodes[0])
  }
}
