import { Product } from '../products/product.entity'
import { Sale } from '../sales/sale.entity'

export type ResponseOkTrue = {
    ok: boolean,
    msg: string,
    status: number,
    product: Product | Product[]
}

export type ResponseOkFalse = {
    ok: boolean,
    msg: string,
    status: number
}

export type ResponseOkTrueSale = {
    ok: boolean,
    msg: string,
    status: number,
    sale: Sale | Sale[]
}

export type ResponseOkFalseSale = {
    ok: boolean,
    msg: string,
    status: number,
}
