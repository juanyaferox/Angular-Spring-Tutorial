
import {Product,ProductTaxe} from "./interface"
/**
 * Ejemplo de funcion de flecha
 */
export const funcArrowExample = (param1:number, param2:number): number[] => {
    return [param1, param1*param2];
}

/**
 * Ejemplo de funcion normal
 */
export function funcExample(param1:number, param2:number):number[] {
    return [param1, param1*param2];
};

/**
 * Ejemplo de funcion con destructuración
 */
export const funcDestruct = ({price, ...restProduct}:Product, taxRate:number) : ProductTaxe => {
    
    const finalPrice = price+(taxRate/price*100)
    return {
        tax:taxRate,
        finalPrice,
        product: {price, ...restProduct}
    }
    
}