import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  public product;
  @Input()
  public price;
  @Input()
  public productId;


  constructor(private cart: CartService) { }

  ngOnInit() {
    this.formatPrice();
  }

  formatPrice() {
    const priceArray = this.price.toString().split('');
    if (priceArray.length === 3) {
      priceArray.splice(1, 0, '.');
    }
    this.price = priceArray.join('').toString();
  }

  addToCart(product) {
    this.cart.addToCart(product);
    console.log(product);
    // window.alert('product added to cart');
  }
}
