import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegistered: boolean = false

  timeLeft: number = 3
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('registracija dosla')
    this.userRegistered = false
  }

  handleRegistration(regFormRef: NgForm) {
    for(let prop in regFormRef.controls) {
      if(!regFormRef.controls[prop].value) {
        regFormRef.controls[prop].markAsTouched()
      }
    } 
    if(regFormRef.valid) {
      console.log('Registered!')
      axios.post(`http://localhost:4600/add_user/${regFormRef.controls.firstName.value}/${regFormRef.controls.lastName.value}/${regFormRef.controls.email.value}/${regFormRef.controls.password.value}`)
      regFormRef.reset()
      this.userRegistered = true
      var count = setInterval( () => {
        if(this.timeLeft === 1) {
          clearInterval(count)
          this.router.navigate(['/login'])
        }
        else this.timeLeft -= 1
      }, 1000)
    }
  }
}
