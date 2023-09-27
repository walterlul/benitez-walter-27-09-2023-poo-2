export interface Product {
    _id: string
    nombre: string
    precio: number
    cantidad: number
  }
  export interface Sale {
    _id: string;
    nombre: string;
    productos: Product[]; // Asegúrate de que esta estructura coincida con la lista de productos que deseas incluir en una venta
    fecha: string;
    saleType: string;
    precioTotal: number;
  }