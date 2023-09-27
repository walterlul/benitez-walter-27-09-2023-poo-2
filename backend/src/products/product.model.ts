import { Schema, model } from 'mongoose'
import { Product } from './product.entity'

// Schema de una tarea en MongoDB con Mongoose
const ProductSchemaMongo = new Schema<Product>({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  id: true
})

// Modelo de una tarea en MongoDB con Mongoose
const ProductModelMongo = model<Product>('Product', ProductSchemaMongo)

export { ProductModelMongo }
