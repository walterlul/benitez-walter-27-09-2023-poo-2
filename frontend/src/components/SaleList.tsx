import { type Sale as SaleType } from '../types';
import { Sale } from './Sale';
import React from 'react';

interface Props {
  sales: SaleType[];
  updateSaleList: (newSaleList: SaleType[]) => void;
}

export const SaleList: React.FC<Props> = ({ sales, updateSaleList }) => {
  return (
    <div>
      {sales.map((sale, index) => {
        return (
          <div key={index}>
            <Sale
              _id={sale._id}
              nombre={sale.nombre}
              productos={sale.productos}
              fecha={sale.fecha}
              saleType={sale.saleType}
              precioTotal={sale.precioTotal}
              sales={sales}
              updateSaleList={updateSaleList}
            />
          </div>
        );
      })}
    </div>
  );
};
