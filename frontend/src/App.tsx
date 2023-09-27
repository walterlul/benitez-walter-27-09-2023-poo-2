import { useState, useEffect } from 'react';
import { ProductList } from './components/ProductList';
import { SaleList } from './components/SaleList';
import { ModalProduct } from './components/ModalProduct';
import { ModalSale } from './components/ModalSale';
import axios from 'axios';
import { Product, Sale } from './types';

const App = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    // Hacer la solicitud GET al backend para obtener los productos
    axios.get('http://localhost:3000/api/products/all')
      .then(response => {
        console.log(response.data.product)
        setProducts(response.data.product);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });

    // Hacer la solicitud GET al backend para obtener las ventas
    axios.get('http://localhost:3000/api/sales/all')
      .then(response => {
        setSales(response.data.sale);
      })
      .catch(error => {
        console.error('Error al obtener las ventas:', error);
      });
  }, []);

  const updateProductList = (newProductList: Product[]) => {
    setProducts(newProductList);
  };

  const updateSaleList = (newSaleList: Sale[]) => {
    setSales(newSaleList);
  };

  return (
    <>
      <div>
        <h2>Productos</h2>
        <ProductList products={products} updateProductList={updateProductList} />
        <ModalProduct products={products} updateProductList={updateProductList} />
      </div>
      <div>
        <h2>Ventas</h2>
        <SaleList sales={sales} updateSaleList={updateSaleList}/>
        <ModalSale products={products} updateSaleList={updateSaleList} sales={sales}/>
      </div>
    </>
  );
};

export default App;
