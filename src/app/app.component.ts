import { Component, OnInit } from '@angular/core';
import { Product, ProductEmit } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Iphone 6S, 64GB',
      description: 'For AT&T / T-Mobile (Renewed)',
      thumbnail: '/assets/iphone-6s.jpg',
      price: 149.0,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Iphone 6S, 64GB',
      description: 'For AT&T / T-Mobile (Renewed)',
      thumbnail: '/assets/iphone-6s.jpg',
      price: 149.0,
      quantity: 1,
    },
  ];

  numberItems: number = 0;
  subTotal: number = 0;
  tax: number = 0;
  taxPercent: number = 5;

  ngOnInit(): void {
    this.updateCartSummary();
  }

  updateCartSummary(): void {
    let numberItems: number = 0;
    let subTotal: number = 0;
    for (const product of this.products) {
      numberItems += product.quantity;
      subTotal += product.price * product.quantity;
    }
    this.numberItems = numberItems;
    this.subTotal = subTotal;
    this.tax = this.taxPercent / 100 * this.subTotal;
  }

  handleRemoveProduct(productId: number): void {
    // xoa san pham
    const index = this.products.findIndex(
      (product) => product.id === productId
    );
    if (index !== -1) {
      this.products.splice(index, 1);
    }

    // tinh lai tong so luong san pham va tong tien
    this.updateCartSummary();
  }

  handleUpdateQuantity(p: ProductEmit): void {
    const product = this.products.find(product => product.id === p.id);
    if(product){
      product.quantity = p.quantity;
    }
    this.updateCartSummary();
  }
}
