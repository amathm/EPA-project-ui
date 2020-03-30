import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public eatTypeProperty: string;
  public products: any[] = [];
  public product: any[] = this.products[0];

  constructor(private api: ApiService, private util: UtilService, private cart: CartService) { }

  ngOnInit() {
    this.eatTypeProperty = this.eatType;
    this.getProducts();
    console.log(this.api.getIsLoggedIn());
  }

  get eatType() {
    return this.util.eatType;
  }

  getProducts() {
    this.api.getProducts().subscribe((data) => {
      for (const each of (data as any)) {
        this.products.push(each);
      }
    });
  }

  addToCart(product) {
    this.cart.addToCart(product);
    // window.alert('product added to cart');
  }
}
