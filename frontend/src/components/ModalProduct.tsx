import { Product as ProductType } from '../types';
import axios from 'axios';
import React, { useState } from 'react';

interface Props {
    products: ProductType[]
  updateProductList: (newProductList: ProductType[]) => void;
}

export const ModalProduct: React.FC<Props> = ({ products, updateProductList }) => {
  const [newProduct, setNewProduct] = useState<ProductType>({
    _id: '',
    nombre: '',
    precio: 0,
    cantidad: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSaveProduct = () => {

    axios.post<{ product: ProductType }>('http://localhost:3000/api/products/create', newProduct)
      .then(response => {
        updateProductList([...products, response.data.product]);
        setNewProduct({
          _id: '', 
          nombre: '',
          precio: 0,
          cantidad: 0,
        });
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Agregar Producto
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Agregar Producto
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
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={newProduct.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="precio" className="form-label">
                    Precio
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    name="precio"
                    value={newProduct.precio}
                    onChange={handleInputChange}
                  />
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
                    value={newProduct.cantidad}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
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
                onClick={handleSaveProduct}
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
