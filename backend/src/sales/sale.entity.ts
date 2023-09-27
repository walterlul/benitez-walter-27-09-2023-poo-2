import { Product } from '../products/product.entity'

export interface Sale{
    id: string,
    nombre: string,
    productos: Product[],
    fecha: string,
    saleType: string,
    precioTotal: number
}
