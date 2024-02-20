import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/product-update.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent {

  category = null;

  filteredProducts: Product[] = [];
  products: Product[] = [];
  types: string[] = [];
  carts: CartItem[] = [];
  brands: string[] = [];

  currentType = "All";
  currentBrand = "All";

  sortBy = ["A-Z", "Z-A", "Price Low to High", "Price High to Low"]

  constructor(private cartService: CartService, private productService: ProductService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get("filter")
      this.productService.getProduct(params.get("filter")).subscribe(product => {
        this.products = product
        this.filteredProducts = this.products;
        const uniqueType = new Set<string>();
        const uniqueBrand = new Set<string>();
        uniqueType.add("All");
        uniqueBrand.add("All");
        for (let product of this.products) {
          uniqueType.add(product.type);
          uniqueBrand.add(product.brand);
        }
        this.types = Array.from(uniqueType);
        this.brands = Array.from(uniqueBrand);
      });
    });
    this.userService.getCart().subscribe(carts => {
      this.carts = carts.map(cart => ({
        name: cart.product.name,
        price: cart.product.price,
        quantity: cart.quantity,
        image: cart.product.image,
        _id: cart.product._id
      }));
    });
  }

  handleAddToCart(product: CartItem) {
    const updatedProduct: CartItem = { _id: product._id, image: product.image, name: product.name, price: product.price, quantity: 1 };
    this.carts = [...this.carts, updatedProduct];
    this.cartService.updateCart(updatedProduct);
  }

  handleUpdateToCart(updatedCartItem: { cartItem: CartItem, isIncrement: boolean }) {
    let updatedProduct: CartItem;
    this.carts = this.carts.map(cartItem => {
      if (updatedCartItem.cartItem._id === cartItem._id) {
        updatedProduct = updatedCartItem.isIncrement
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : { ...cartItem, quantity: cartItem.quantity - 1 };
        this.cartService.incrementQuantity({ cartItem: updatedProduct, isIncrement: updatedCartItem.isIncrement })
        return updatedProduct;
      }
      return cartItem;
    }
    );
  }

  handleSortFilter(filter: string) {
    let sortedProduct = [];
    let products = (this.filteredProducts.length > 0) ? this.filteredProducts : this.products
    if (filter === "A-Z") {
      sortedProduct = products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === "Z-A") {
      sortedProduct = products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filter === 'Price Low to High') {
      sortedProduct = products.sort((a, b) => a.price - b.price);
    } else if (filter === 'Price High to Low') {
      sortedProduct = products.sort((a, b) => b.price - a.price);
    }
    if (this.filteredProducts.length > 0) {
      this.filteredProducts = sortedProduct;
      return;
    }
    this.products = sortedProduct;
  }

  handleTypeFilter(filter: string) {
    this.currentType = filter;
    this.applyFilter();
  }

  handleBrandFilter(filter: string) {
    this.currentBrand = filter;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredProducts = this.products.filter(product => {
      return (this.currentType == "All" || product.type == this.currentType) && (this.currentBrand == "All" || product.brand == this.currentBrand);
    })
  }
}
