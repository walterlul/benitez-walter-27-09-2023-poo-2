import { Schema, model } from 'mongoose'
import { Sale } from './sale.entity'

const SaleSchemaMongo = new Schema<Sale>({
  nombre: {
    type: String,
    required: true
  },
  productos: {
    type: [],
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  saleType: {
    type: String,
    required: true
  },
  precioTotal: {
    type: Number,
    required: true
  }
}, {
  timestamps: true, // Agrega marcas de tiempo
  _id: true // Usa el _id predeterminado generado por MongoDB
})

// Modelo de una venta en MongoDB con Mongoose
const SaleModelMongo = model<Sale>('Sale', SaleSchemaMongo)

export { SaleModelMongo }
