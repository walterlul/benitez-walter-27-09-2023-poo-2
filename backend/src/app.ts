import express, { Application } from 'express'
import { connectToMongo } from './configs/database'
import { startProductRouter } from './products/product.routes'
import { ProductServiceMongo } from './products/services/product.service'
import { startSaleRouter } from './sales/sale.routes'
import { SaleServiceMysql } from './sales/services/sale.service'
import cors from 'cors'

// función de inicio del servidor

export function startServer () {
  // instancia de express
  const app: Application = express()

  // middlewares
  app.use(express.json())
  app.use(cors())
  app.use('/api/products', startProductRouter(new ProductServiceMongo()))
  app.use('/api/sales', startSaleRouter(new SaleServiceMysql()))

  // levantar el servidor
  app.listen(3000, () => {
    // Conectarse a la base de datos

    // * MySQL
    connectToMongo()

    // mensaje de éxito
    console.log('Server is running on port 3000')
  })

  return app
}
