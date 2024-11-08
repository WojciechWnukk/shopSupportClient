import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { get } from 'http';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  //get products from service
  products: any[] = [];
  product: Product = {
    name: '',
    price: 0,
    description: '',
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  //add product
  addProduct() {
    this.apiService.addProduct(this.product).subscribe({
      next: (response) => {
        this.products.push(response);
        // Reset form
        this.product = {
          name: '',
          price: 0,
          description: '',
        };
      },
      error: (error) => {
        console.error('Error adding product:', error);
      },
    });
  }
}
