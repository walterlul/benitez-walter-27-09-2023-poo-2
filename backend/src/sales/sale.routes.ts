import { Router } from 'express'
import { SaleService } from './sale.service'

function startSaleRouter (saleService: SaleService) {
  const saleRouter = Router()

  saleRouter.get('/all', async (req, res) => {
    try {
      const allSales = await saleService.list()
      res.status(allSales.status).json(allSales)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        ok: false,
        msg: 'Hubo un error en el servidor'
      })
    }
  })

  saleRouter.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const sale = await saleService.find(id)
      res.status(sale.status).json(sale)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        ok: false,
        msg: 'Hubo un error en el servidor'
      })
    }
  })

  saleRouter.post('/create', async (req, res) => {
    try {
      const { nombre, productos, fecha } = req.body

      console.log(req.body)
      const addSale = await saleService.create(nombre, productos, fecha)
      res.status(addSale.status).json(addSale)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        ok: false,
        msg: 'Hubo un error en el servidor'
      })
    }
  })

  saleRouter.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id
      const deletedSale = await saleService.delete(id)
      res.status(deletedSale.status).json(deletedSale)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        ok: false,
        msg: 'Hubo un error en el servidor'
      })
    }
  })

  return saleRouter
}

export { startSaleRouter }
