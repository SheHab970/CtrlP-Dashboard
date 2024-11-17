import { Injectable } from '@angular/core';
import { log } from 'console';
import { Observable, of } from 'rxjs';

// Define the Product interface
export interface Product {
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  inventoryStatus: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Sample data - this will later be replaced with an API call
  private products: Product[] = [
    {
      name: 'Product 1',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Product 2',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      rating: 5,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      name: 'Product 3',
      image: 'blue-band.jpg',
      price: 45,
      category: 'Fitness',
      rating: 3,
      inventoryStatus: 'OUTOFSTOCK',
    },

    {
      name: 'Bamboo Watch',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Black Watch',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      rating: 5,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      name: 'Blue Band',
      image: 'blue-band.jpg',
      price: 45,
      category: 'Fitness',
      rating: 3,
      inventoryStatus: 'OUTOFSTOCK',
    },
    {
      name: 'Brown Purse',
      image: 'brown-purse.jpg',
      price: 120,
      category: 'Fashion',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Brown Purse',
      image: 'brown-purse.jpg',
      price: 95,
      category: 'Footwear',
      rating: 5,
      inventoryStatus: 'INSTOCK',
    },

    {
      name: 'Product 1',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Product 2',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      rating: 5,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      name: 'Product 3',
      image: 'blue-band.jpg',
      price: 45,
      category: 'Fitness',
      rating: 3,
      inventoryStatus: 'OUTOFSTOCK',
    },

    {
      name: 'Bamboo Watch',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Black Watch',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      rating: 5,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      name: 'Blue Band',
      image: 'blue-band.jpg',
      price: 45,
      category: 'Fitness',
      rating: 3,
      inventoryStatus: 'OUTOFSTOCK',
    },
    {
      name: 'Brown Purse',
      image: 'brown-purse.jpg',
      price: 120,
      category: 'Fashion',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },

    {
      name: 'Product 1',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Product 2',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      rating: 5,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      name: 'Product 3',
      image: 'blue-band.jpg',
      price: 45,
      category: 'Fitness',
      rating: 3,
      inventoryStatus: 'OUTOFSTOCK',
    },

    {
      name: 'Bamboo Watch',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Black Watch',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      rating: 5,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      name: 'Blue Band',
      image: 'blue-band.jpg',
      price: 45,
      category: 'Fitness',
      rating: 3,
      inventoryStatus: 'OUTOFSTOCK',
    },
    {
      name: 'Brown Purse',
      image: 'brown-purse.jpg',
      price: 120,
      category: 'Fashion',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Brown Purse',
      image: 'brown-purse.jpg',
      price: 95,
      category: 'Footwear',
      rating: 5,
      inventoryStatus: 'INSTOCK',
    },

    {
      name: 'Product 1',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Product 2',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      rating: 5,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      name: 'Product 3',
      image: 'blue-band.jpg',
      price: 45,
      category: 'Fitness',
      rating: 3,
      inventoryStatus: 'OUTOFSTOCK',
    },

    {
      name: 'Bamboo Watch',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Black Watch',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      rating: 5,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      name: 'Blue Band',
      image: 'blue-band.jpg',
      price: 45,
      category: 'Fitness',
      rating: 3,
      inventoryStatus: 'OUTOFSTOCK',
    },
    {
      name: 'Brown Purse',
      image: 'brown-purse.jpg',
      price: 120,
      category: 'Fashion',
      rating: 4,
      inventoryStatus: 'INSTOCK',
    },
  ];

  // Method to get products (simulating an API call)
  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
