import { Product as ProductType } from '../types';
import { Product } from './Product';
import React from 'react';

interface Props {
  products: ProductType[];
  updateProductList: (newProductList: ProductType[]) => void;
}

export const ProductList: React.FC<Props> = ({ products, updateProductList }) => {
  

  return (
    <div>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <Product
              _id={product._id}
              nombre={product.nombre}
              precio={product.precio}
              cantidad={product.cantidad}
              products={products}
              updateProductList={updateProductList}
            ></Product>
          </div>
        );
      })}

     
    </div>
  );
};
