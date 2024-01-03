import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProduct(filter: string) {
    return this.http.post<Product[]>(`http://localhost:3000/api/product`,{filter:filter});
  }
}
