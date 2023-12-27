import { Product } from "./product.model"

export interface Cart{
    id: string,
    product:Product
    quantity: number
}