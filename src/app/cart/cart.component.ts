import { Component, OnInit, OnChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {
  public items;
  public prices: any[] = [];
  public price: any[] = [];
  public total: any = 0;
  public balance = Number(localStorage.getItem('balance')) || 0;

  constructor(private cartService: CartService, private api: ApiService, private router: Router) { }

  ngOnChanges() {
    // console.log(this.quantity);
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
    // console.log(this.items);
    // this.getTotal();
    // console.log()
    for (const item of this.items) {
      this.prices.push(item.price);
    }
    this.loadStripe();
    // console.log(this.price);
    // console.log(this.quantity);
  }

  getTotal() {
  }

  cancelOrder() {
    const prompt = confirm('Ary you sure you want to cancel your order');
    if (!(prompt)) {
      return false;
    }
    this.items = [];
    this.cartService.clearItems();
    return true;
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }

  pay(amount) {
    const paymentPopUp = (window as any).StripeCheckout.configure({
      key: 'pk_test_gAoncY2KHEfZdIbxdiWPKjjc00oVIqvVAT',
      locale: 'auto',
      token: (token) => {
        console.log(token.id);
        alert('Payment Successful');
      }
    });
    paymentPopUp.open({
      name: 'Payment',
      description: 'First Catering Ltd',
      amount: this.handlePayment(),
      currency: 'gbp',
    });
  }

  getItemsTotal() {
    let total = 0;
    for (const item of this.items) {
      item.total = item.priceFormat * item.quantity.toFixed(2);
      total += item.total;
    }
    this.total = total.toFixed(2);
    return this.total;
  }

  handlePayment() {
    console.log(this.balance);
    const total = Number(this.getItemsTotal());
    // return this.getItemsTotal() * 100;
    if ((this.balance - total) >= 0) {
      window.alert('payment will be taken out of balance');
      console.log(this.balance);
      localStorage.setItem('balance', `${this.balance - total}`);
      return Number(this.getItemsTotal() * 100);
    }
    return Number(this.getItemsTotal() * 100);
  }

  newPay(total) {
    this.api.payEndpoint(total).subscribe(data => {
      console.log(data);
    });
  }
}
