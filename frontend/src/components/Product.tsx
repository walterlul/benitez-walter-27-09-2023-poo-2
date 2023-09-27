import axios from "axios"
import { type Product as ProductType } from "../types"
interface Props extends ProductType{
    products: ProductType[]
    updateProductList:(newProductList: ProductType[]) => void
}


export const Product: React.FC<Props> = ({ products, _id, nombre, precio, cantidad, updateProductList }) => {
  const handleDeleteProduct = () => {
    console.log('holaa')
    console.log(_id)
    // Realiza la petición al backend para agregar el nuevo producto
    axios.delete(`http://localhost:3000/api/products/delete/${_id}`)
      .then(response => {
        // Actualiza la lista de productos en App
        console.log(response)
        const updatedProducts = products.filter(product => product._id !== _id);
        updateProductList(updatedProducts);
        // Limpia los campos del formulario
      })
      .catch(error => {
        console.error('Error al borrar el producto:', error);
      });
  };
  return (
    <div className="card" style={{width: '18rem'}}>
    <div className="card-body">
      <h5 className="card-title">{nombre}</h5>
      <h6 className="card-subtitle mb-2 text-body-secondary">Precio: ${precio}</h6>
      <h6 className="card-subtitle mb-2 text-body-secondary">Cantidad: {cantidad}</h6>
      <button onClick={()=>{handleDeleteProduct()}}>Eliminar</button>
    </div>
  </div>
  )
}
