import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, ProductEmit } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() onRemoveProduct = new EventEmitter<number>();
  @Output() onUpdateQuantity = new EventEmitter<ProductEmit>();

  constructor() {}

  ngOnInit(): void {
  }

  removeProduct(productId: number): void {
    this.onRemoveProduct.emit(productId);
  }

  updateQuantity(productId: number, element: HTMLInputElement){
    const value = element.value;
    const intValue = parseInt(value);

    if(intValue < 1){
      element.value = -intValue + '';
    } else if(value.length > 2){
      element.value = value.slice(0, 2);
    }
    let p: ProductEmit = {
      id: productId,
      quantity: parseInt(element.value) || 0
    };
    this.onUpdateQuantity.emit(p);
  }
}
