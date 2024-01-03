import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from 'src/app/models/product-update.model';
import { CustomerOrder } from 'src/app/models/customer-order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
interface CartInformation{
  firstName: string,
  lastName:string,
  phone: number,
  address: string,
  cartItem: CartItem[]
}

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.scss']
})

export class ConfirmCartComponent implements OnInit {
  currentStep = 1;
  steps = [1, 2, 3]; 
  cartItems: CartItem[] = [];
  cartForm: FormGroup;
  cartInformation: CartInformation;
  constructor(private userSerivce: UserService){}
  ngOnInit(): void {
    this.userSerivce.getCart().subscribe({
      next:(cartItems)=>{
        this.cartItems = cartItems;
      },
      error:(error)=>{
        console.log(error)
      }
    })
    this.cartForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+61-?)|0)?[0-9]{10}$")]),
      address: new FormControl('')
    });
  }
  moveStep(step:number){
    if(this.currentStep === 1){
      this.cartInformation = this.cartForm.value;
    }
    this.currentStep+=step;
  }
  submitCart(){
    const order: CustomerOrder = {
      firstName: this.cartForm.get('firstName').value,
      lastName: this.cartForm.get('lastName').value,
      phone: this.cartForm.get('phone').value,
      address: this.cartForm.get('address').value,
      status:"Preparing",
      dateTime: new Date(),
      cartItems: this.cartItems
    };  
    this.userSerivce.createOrder(order)  
    this.currentStep++;
  }
}
