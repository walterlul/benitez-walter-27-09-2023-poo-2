import { SaleModelMongo } from '../sale.model'
import { SaleService } from '../sale.service'
import { ResponseOkFalseSale, ResponseOkTrueSale } from '../../types/responses'
import { Product } from '../../products/product.entity'
import { ProductModelMongo } from '../../products/product.model'

export class SaleServiceMysql implements SaleService {
  model = SaleModelMongo
  model2 = ProductModelMongo

  async list (): Promise<ResponseOkFalseSale | ResponseOkTrueSale> {
    const sales = await this.model.find()
    if (sales.length > 0) {
      return {
        ok: true,
        msg: 'Lista de ventas:',
        status: 200,
        sale: sales
      }
    }
    return {
      ok: false,
      msg: 'No hay ventas en su base de datos.',
      status: 400
    }
  }

  async find (id: string): Promise<ResponseOkFalseSale | ResponseOkTrueSale> {
    const sale = await this.model.findById(id)

    if (sale) {
      return {
        ok: true,
        msg: 'Venta encontrada',
        status: 200,
        sale
      }
    }
    return {
      ok: false,
      msg: 'No se encontro este producto',
      status: 404
    }
  }

  async create (nombre: string, productos: Product[], fecha: string): Promise<ResponseOkFalseSale | ResponseOkTrueSale> {
    let saleType = ''
    let esMayorista = true
    let precioTotal = 0
    const existingSale = await this.model.findOne({ nombre })

    if (!nombre || !productos || !fecha) {
      return {
        ok: false,
        msg: 'Faltan campos requeridos',
        status: 400
      }
    }

    if (!Array.isArray(productos)) {
      return {
        ok: false,
        msg: 'El parametro productos debe ser un array',
        status: 400
      }
    }

    if (existingSale) {
      return {
        ok: false,
        msg: 'Ya existe una venta con ese nombre',
        status: 409
      }
    }

    for (const producto of productos) {
      if (!producto.precio || !producto.cantidad || !producto.nombre || !producto._id) {
        return {
          ok: false,
          msg: 'El producto no esta siendo cargado correctamente',
          status: 400
        }
      }
      if (productos.length === 1) {
        saleType = 'Venta por unidad'
        precioTotal += producto.precio * producto.cantidad
      }
      if (producto.cantidad < 5) {
        esMayorista = false
      }
      if (esMayorista === true && productos.length > 1) {
        saleType = 'Venta mayorista'
        precioTotal += producto.precio * producto.cantidad
      }
      if (esMayorista === false && productos.length > 1) {
        saleType = 'Venta por bolsa'
        precioTotal += producto.precio * producto.cantidad
      }
    }

    const newSale = await this.model.create({
      nombre,
      productos,
      fecha,
      saleType,
      precioTotal
    })

    await newSale.save()

    // Disminuir la cantidad de productos en la base de datos
    for (const producto of productos) {
    // Actualizar la cantidad del producto en la base de datos
      await this.model2.findByIdAndUpdate(producto._id, { $inc: { cantidad: -producto.cantidad } })
    }

    return {
      ok: true,
      msg: 'Venta creada correctamente',
      status: 201,
      sale: newSale
    }
  }

  async delete (id: string): Promise<ResponseOkFalseSale | ResponseOkTrueSale> {
    const deletedSale = await this.model.findById(id)

    if (deletedSale) {
      await this.model.deleteOne({ _id: id })
      return {
        ok: true,
        msg: 'Venta eliminada correctamente',
        status: 200,
        sale: deletedSale
      }
    }

    return {
      ok: false,
      msg: 'No se encontro la venta',
      status: 404
    }
  }
}
