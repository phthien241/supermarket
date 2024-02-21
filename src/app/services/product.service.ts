import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProduct(filter: string) {
    return this.http.post<Product[]>(`${environment.apiUrl}/api/product`,{filter:filter});
  }
}
