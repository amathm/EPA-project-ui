import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../util.service';
import { ApiService } from '../api.service';
import { Product, Type } from '../product';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public products: Product[] = [];
  public product: Product;
  public price;
  public type: Type = {};

  constructor(private route: ActivatedRoute, private util: UtilService, private api: ApiService, private cart: CartService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.api.getProducts().subscribe((data) => {
      for (const each of (data as any)) {
        this.products.push(each);
      }
      this.route.paramMap.subscribe(params => {
        this.product = data[params.get('productId')];
        this.type = this.product.type;
      });
    });
  }

  formatPrice(price) {
    this.price = ((price / 100).toFixed(2));
    console.log(this.price);
    return this.price;
  }

  addToCart(product) {
    this.cart.addToCart(product);
    // window.alert('product added to cart');
  }

  returnProductType(type) {
    if (type.beverage) {
      return 'Beverage';
    }
    if (type.food) {
      return 'Food';
    }
  }
}
