import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { CheckoutService } from '../checkout/checkout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('addFundsRef') addFundsRef: ElementRef
  showHome: boolean = false // condition rendering
  viewProfile: boolean = false // for profile rendering
  addBalance: boolean = false // for add-balance rendering
  user: any
  userID: any;
  usersPurchases: []
  isAdmin: boolean = false
  constructor(private route: ActivatedRoute,
              private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['id']
    this.isAdmin = this.checkoutService.isAdmin
    this.getUser()
  }

  getUser() {
    axios.get('http://localhost:4600/users/id_' + this.userID)
      .then(response => {
        this.user = response.data[0]
        this.showHome = true
      })
      .catch(error => {
        console.log(error)
      })
  }

  toogleViewProfile() {
    console.log('viewProfile:', this.viewProfile, '--> ', !this.viewProfile)
    this.viewProfile = !this.viewProfile
  }

  toogleAddBalance() {
    console.log('addBalance:', this.addBalance, '--> ', !this.addBalance)
    this.addBalance = !this.addBalance
  }

  addFunds() {
    if(this.addFundsRef.nativeElement.value) {
      console.log(this.addFundsRef.nativeElement.value)
      axios.post(`http://localhost:4600/update/user/${this.userID}/balance/+/${this.addFundsRef.nativeElement.value}`)
      this.user.balance += +this.addFundsRef.nativeElement.value
      this.checkoutService.user.balance = this.user.balance
      this.addFundsRef.nativeElement.value = 0
    }
  }

  getColor() {
    return this.isAdmin === true ? 'lightgreen' : ''
  }

  onBillPayed() {
    this.getUser()
  }

}
