import { ResponseOkFalse, ResponseOkTrue } from '../types/responses'

export interface ProductService {
    list (): Promise<ResponseOkFalse | ResponseOkTrue>
    find (id: string): Promise<ResponseOkFalse | ResponseOkTrue>
    create (nombre: string, precio: number, cantidad: number): Promise<ResponseOkFalse | ResponseOkTrue>
    update (id: string, nombre: string, precio: number, cantidad: number): Promise<ResponseOkFalse | ResponseOkTrue>
    delete (id: string): Promise<ResponseOkFalse | ResponseOkTrue>
}
