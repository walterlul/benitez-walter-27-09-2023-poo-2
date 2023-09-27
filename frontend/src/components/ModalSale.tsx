import { type Sale as SaleType, type Product as ProductType } from '../types';
import axios from 'axios';
import React, { useState } from 'react';

interface Props {
  sales: SaleType[];
  products: ProductType[];
  updateSaleList: (newSaleList: SaleType[]) => void;
}

export const ModalSale: React.FC<Props> = ({ sales, products, updateSaleList }) => {
  const [newSale, setNewSale] = useState<SaleType>({
    _id: '',
    nombre: '',
    productos: [], // Aquí debes modificar la estructura según tu necesidad
    fecha: '',
    saleType: '',
    precioTotal: 0,
  });

  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [productQuantity, setProductQuantity] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSale({
      ...newSale,
      [name]: value,
    });
  };

  const handleProductSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };

  const handleProductQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductQuantity(parseInt(event.target.value, 10));
  };

  const handleAddProduct = () => {
    if (selectedProduct && productQuantity > 0) {
      if(products !== null){
        const selectedProductInfo = products.find(product => product._id === selectedProduct);
        if (selectedProductInfo) {
          const productToAdd = {
            _id: selectedProductInfo._id,
            nombre: selectedProductInfo.nombre,
            precio: selectedProductInfo.precio,
            cantidad: productQuantity,
          };
          setNewSale({
            ...newSale,
            productos: [...newSale.productos, productToAdd],
          });
  
          setSelectedProduct('');
          setProductQuantity(0);
        }
      }
      

    }
  };

  const handleSaveSale = () => {
    axios
      .post<{ sale: SaleType }>('http://localhost:3000/api/sales/create', newSale)
      .then((response) => {
        updateSaleList([...sales, response.data.sale]);
        setNewSale({
          _id: '', 
          nombre: '',
          productos: [],
          fecha: '',
          saleType: '',
          precioTotal: 0,
        });
      })
      .catch((error) => {
        console.error('Error al agregar la venta:', error);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalSale"
      >
        Agregar Venta
      </button>

      <div
        className="modal fade"
        id="exampleModalSale"
        tabIndex={-1}
        aria-labelledby="exampleModalLabelSale"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabelSale">
                Agregar Venta
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre de la Venta
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={newSale.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fecha" className="form-label">
                    Fecha de Venta
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    name="fecha"
                    value={newSale.fecha}
                    onChange={handleInputChange}
                  />
                </div>
               
                <div className="mb-3">
                  <label htmlFor="productos" className="form-label">
                    Productos
                  </label>
                  <select
                    className="form-select"
                    id="productos"
                    name="productos"
                    value={selectedProduct}
                    onChange={handleProductSelectChange}
                  >
                    <option value="">Selecciona un producto</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.nombre} - ${product.precio}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="cantidad" className="form-label">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cantidad"
                    name="cantidad"
                    value={productQuantity}
                    onChange={handleProductQuantityChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddProduct}
                >
                  Agregar Producto
                </button>
              </form>
              <div className="mb-3">
                <h5>Productos Agregados:</h5>
                <ul>
                  {newSale.productos.map((product, index) => (
                    <li key={index}>
                      {product.nombre} - Cantidad: {product.cantidad}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSaveSale}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
