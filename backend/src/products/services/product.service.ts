import { ProductModelMongo } from '../product.model'
import { ProductService } from '../product.service'
import { ResponseOkFalse, ResponseOkTrue } from '../../types/responses'

export class ProductServiceMongo implements ProductService {
  model = ProductModelMongo

  async list (): Promise<ResponseOkFalse | ResponseOkTrue> {
    const products = await this.model.find()
    if (products.length > 0) {
      return {
        ok: true,
        msg: 'Lista de productos:',
        status: 200,
        product: products
      }
    }
    return {
      ok: false,
      msg: 'No hay productos en su base de datos',
      status: 400
    }
  }

  async find (id: string): Promise<ResponseOkFalse | ResponseOkTrue> {
    const product = await this.model.findById(id)
    if (product) {
      return {
        ok: true,
        msg: 'Producto encontrado:',
        status: 200,
        product
      }
    }
    return {
      ok: false,
      msg: 'No se encontro ese producto',
      status: 404
    }
  }

  async create (nombre: string, precio: number, cantidad: number): Promise<ResponseOkFalse | ResponseOkTrue> {
    const existingProduct = await this.model.findOne({ nombre })
    if (!nombre || !precio || !cantidad) {
      return {
        ok: false,
        msg: 'Faltan campos requeridos',
        status: 400
      }
    }

    if (existingProduct) {
      return {
        ok: false,
        msg: 'El producto ya existe',
        status: 409
      }
    }

    const newProduct = await this.model.create({
      nombre,
      precio,
      cantidad
    })

    await newProduct.save()

    return {
      ok: true,
      msg: 'Producto creado correctamente',
      status: 201,
      product: newProduct
    }
  }

  async update (id: string, nombre: string, precio: number, cantidad: number): Promise<ResponseOkFalse | ResponseOkTrue> {
    if (id) {
      const updatedProduct = await this.model.findOneAndUpdate(
        { _id: id },
        { nombre, precio, cantidad },
        { new: true }
      )
      if (updatedProduct) {
        return {
          ok: true,
          msg: 'Producto actualizado.',
          status: 200,
          product: updatedProduct
        }
      }
    }

    return {
      ok: false,
      msg: 'No se pudo actualizar. El producto no fue encontrado.',
      status: 404
    }
  }

  async delete (id: string): Promise<ResponseOkFalse | ResponseOkTrue> {
    const deletedProduct = await this.model.findById(id)

    if (deletedProduct) {
      await this.model.deleteOne({ _id: id })
      return {
        ok: true,
        msg: 'Producto eliminado correctamente.',
        status: 200,
        product: deletedProduct
      }
    }

    return {
      ok: false,
      msg: 'No se encontro el producto',
      status: 404
    }
  }
}
