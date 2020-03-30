import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items = [];

  constructor() { }

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    for (const item of this.items) {
      // const original = item.price;
      item.price = item.price.toString();
      item.priceFormat = (parseFloat(item.price) / 100).toFixed(2);
      item.quantity = 1;
      // console.log(item.priceFormat);
      // console.log(item.price.toString() / 100);
    }
    return this.items;
  }

  clearItems() {
    this.items = [];
    return this.items;
  }
}
