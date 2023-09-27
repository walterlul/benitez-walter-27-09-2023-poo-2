import { type Sale as SaleType } from '../types';
import axios from 'axios';
import React, { useState } from 'react';

interface Props extends SaleType {
  sales: SaleType[];
  updateSaleList: (newSaleList: SaleType[]) => void;
}

export const Sale: React.FC<Props> = ({
  sales,
  _id,
  nombre,
  productos,
  fecha,
  saleType,
  precioTotal,
  updateSaleList,
}) => {
  const [showProductDetails, setShowProductDetails] = useState(false);

  const handleDeleteSale = () => {
    axios
      .delete(`http://localhost:3000/api/sales/delete/${_id}`)
      .then(response => {
        console.log(response);
        const updatedSales = sales.filter(sale => sale._id !== _id);
        updateSaleList(updatedSales);
      })
      .catch(error => {
        console.error('Error al borrar la venta:', error);
      });
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">Fecha: {fecha}</h6>
        <h6 className="card-subtitle mb-2 text-body-secondary">Tipo de Venta: {saleType}</h6>
        <h6 className="card-subtitle mb-2 text-body-secondary">Precio Total: ${precioTotal}</h6>
        <button onClick={handleDeleteSale}>Eliminar</button>
        <button onClick={() => setShowProductDetails(!showProductDetails)}>Mostrar Detalles</button>

        {showProductDetails && (
          <div>
            <h6 className="card-subtitle mb-2 text-body-secondary">Productos Vendidos:</h6>
            <ul>
              {productos.map((producto, index) => (
                <li key={index}>
                  {producto.nombre} - Cantidad: {producto.cantidad}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
