import { Product } from '../products/product.entity'
import { ResponseOkFalseSale, ResponseOkTrueSale } from '../types/responses'

export interface SaleService {
    list (): Promise<ResponseOkFalseSale | ResponseOkTrueSale>
    find (id: string): Promise<ResponseOkFalseSale | ResponseOkTrueSale>
    create (nombre: string, productos: Product[], fecha: string): Promise<ResponseOkFalseSale | ResponseOkTrueSale>
    delete (id: string): Promise<ResponseOkFalseSale | ResponseOkTrueSale>
}
