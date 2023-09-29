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
        const responseData = response.data;
        if (responseData.ok && responseData.status === 200) {
          // Si la respuesta indica que está todo bien, actualiza los productos
          setProducts(responseData.product);
        } else {
          // Si la respuesta no es exitosa, establece products en un valor inicial
          setProducts([]);
        }
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
        // En caso de error, establece products en un valor inicial
        setProducts([]);
      });

    // Hacer la solicitud GET al backend para obtener las ventas
    axios.get('http://localhost:3000/api/sales/all')
      .then(response => {
        const responseData = response.data;
        if (responseData.ok && responseData.status === 200) {
          // Si la respuesta indica que está todo bien, actualiza las ventas
          setSales(responseData.sale);
        } else {
          // Si la respuesta no es exitosa, establece sales en un valor inicial
          setSales([]);
        }
      })
      .catch(error => {
        console.error('Error al obtener las ventas:', error);
        // En caso de error, establece sales en un valor inicial
        setSales([]);
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
        {products.length === 0 ? (
          <>
          <p>No hay productos disponibles.</p>
          <ModalProduct products={products} updateProductList={updateProductList} />
          </>
        ) : (
          <>
            <ProductList products={products} updateProductList={updateProductList} />
            <ModalProduct products={products} updateProductList={updateProductList} />
          </>
        )}
      </div>
      <div>
        <h2>Ventas</h2>
        {sales.length === 0 ? (
          <>
          <p>No hay ventas disponibles.</p>
          <ModalSale products={products} updateSaleList={updateSaleList} sales={sales} />
          </>
        ) : (
          <>
            <SaleList sales={sales} updateSaleList={updateSaleList} />
            <ModalSale products={products} updateSaleList={updateSaleList} sales={sales} />
          </>
        )}
      </div>
    </>
  );
};

export default App;
