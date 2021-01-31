import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { CheckoutService } from '../checkout/checkout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginBtn',{ static:true }) loginBtn: ElementRef;

  constructor(private router: Router,
              private checkoutService: CheckoutService) { }

  ngOnInit(): void {
  }

  handleSubmit(formRef: NgForm) {
    for(let prop in formRef.controls) {
      if(!formRef.controls[prop].value) {
        formRef.controls[prop].markAsTouched()
      }
    } 
    if(formRef.valid) {
      axios.get(`http://localhost:4600/users/email_${formRef.controls.email.value}/password_${formRef.controls.password.value}`).then(response => {
        const {data} = response 
        if(data === "") { // NOT FOUND USER
          formRef.reset()
          console.log(this.loginBtn.nativeElement.value)
          this.loginBtn.nativeElement.classList.remove('btn-outline-info')
          this.loginBtn.nativeElement.classList.add('btn-danger')
          this.loginBtn.nativeElement.value = 'Invalid data'

          setTimeout( () => {
            this.loginBtn.nativeElement.classList.remove('btn-danger')
            this.loginBtn.nativeElement.classList.add('btn-outline-info')
            this.loginBtn.nativeElement.value = 'L o g i n'
          }, 1000)
        } 
        else { // FOUND USER
          if(data.userid === 1)
            this.checkoutService.isAdmin = true
          else this.checkoutService.isAdmin = false
          this.router.navigate(['/home', data.userid])
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
