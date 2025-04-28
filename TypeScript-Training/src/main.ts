import './style.css'
import {Product, ProductTaxe} from './ts/interface'
import {funcDestruct} from './ts/functions'

const products:Product[] = [{
  name:"Prueba01",
  price:100
},
{
  name:"Prueba02",
  price:200
},
{
  name:"Prueba03",
  price:300
}];

const tax:number = 10;
const productsTaxed:ProductTaxe[] = products.map(product => funcDestruct(product,tax));

console.table(productsTaxed.map(
  ({finalPrice, tax, product: {name, price}}) => ({finalPrice, tax, name, price})
));



