export interface Product {
    name:string,
    price:number
}
export interface ProductTaxe {
    product:Product,
    tax:number,
    finalPrice:number
}