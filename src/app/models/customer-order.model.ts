import { CartItem } from "./product-update.model";

export interface CustomerOrder{
    firstName:string,
    lastName: string,
    address:string,
    phone:string,
    status: string,
    dateTime: Date,
    cartItems: CartItem[];
}