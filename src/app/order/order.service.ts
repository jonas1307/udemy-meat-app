import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/shopping-cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs/observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MEAT_API } from "../app.api";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class OrderService {
  constructor(private cartService: ShoppingCartService,
    private http: HttpClient,
    private loginService: LoginService) { }

  itemsValue(): number {
    return this, this.cartService.total()
  }

  cartItems(): CartItem[] {
    return this.cartService.items
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item)
  }

  checkOrder(order: Order): Observable<string> {
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn) {
      headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
    }

    return this.http.post<Order>(`${MEAT_API}/orders`, order, { headers: headers })
      .map(order => order.id)
  }

  clear() {
    this.cartService.clear()
  }

}
