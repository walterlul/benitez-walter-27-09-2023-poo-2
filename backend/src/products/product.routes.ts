import { Router } from 'express'
import { ProductService } from './product.service'

function startProductRouter (productService: ProductService) {
  const productRouter = Router()

  productRouter.get('/all', async (req, res) => {
    const allProducts = await productService.list()
    res.status(200).json(allProducts)
  })

  productRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const product = await productService.find(id)
    res.status(200).json(product)
  })

  productRouter.post('/create', async (req, res) => {
    try {
      const { nombre, precio, cantidad } = req.body
      const addProduct = await productService.create(nombre, precio, cantidad)
      res.status(addProduct.status).json(addProduct)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        ok: false,
        msg: 'Hubo un error en el servidor'
      })
    }
  })

  productRouter.put('/update/:id', async (req, res) => {
    try {
      const id = req.params.id
      const { nombre, precio, cantidad } = req.body
      const updatedProduct = await productService.update(id, nombre, precio, cantidad)
      res.status(201).json({
        ok: true,
        msg: 'Producto actualizado',
        updatedProduct
      })
    } catch (error) {
      return {
        ok: false,
        msg: 'Hubo un error en el servidor'
      }
    }
  })

  productRouter.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id
      console.log(id)
      const deletedProduct = await productService.delete(id)
      res.status(201).json({
        ok: true,
        msg: 'Producto borrado',
        deletedProduct
      })
    } catch (error) {
      console.error(error)
    }
  })

  return productRouter
}

export { startProductRouter }
