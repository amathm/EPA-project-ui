import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public eatType: string;
  public products: any[] = [];

  constructor(private api: ApiService) { }

  getProducts() {
    this.api.getProducts().subscribe(data => {
      for (const product of (data as any)) {
        this.products.push(product);
      }
    });
  }
}
