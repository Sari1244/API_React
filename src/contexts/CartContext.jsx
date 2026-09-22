import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";


const CartContext = createContext();
const CLAVE_CARRITO = "carrito_libros";

function leerCarritoDesdeStorage() {
  try {
    const data = localStorage.getItem(CLAVE_CARRITO);
    return data
      ? JSON.parse(data)
      : [];
  } catch {
    return [];
  }
}


export function CartProvider({ children }) {

  const [carrito, setCarrito] = useState(
    leerCarritoDesdeStorage
  );

  // Eliminar el carrito viejo de Rick and Morty
  useEffect(() => {
    localStorage.removeItem("carrito");
  }, []);


  // Guardar carrito de libros
  useEffect(() => {

    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify(carrito)
    );

  }, [carrito]);


  // AGREGAR

  const agregarAlCarrito = useCallback((libro) => {

    const yaExiste = carrito.some(
      (item) => item.id === libro.key
    );

    setCarrito((prev) => {

      if (yaExiste) {
        return prev.map((item) =>
          item.id === libro.key
            ? {
              ...item,
              cantidad: item.cantidad + 1
            }
            : item
        );
      }

      return [
        ...prev,
        {
          id: libro.key,
          name: libro.title,
          image: libro.cover_i
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
            : "",
          precio: libro.precio,
          cantidad: 1,
        },
      ];
    });

    if (yaExiste) {
      toast.success(
        "Se agregó otra unidad al carrito"
      );
    } else {
      toast.success(
        "Libro agregado al carrito"
      );
    }

  }, [carrito]);


  // AUMENTAR

  const aumentarCantidad = useCallback((id) => {

    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            cantidad: item.cantidad + 1
          }
          : item
      )
    );

  }, []);


  // DISMINUIR

  const disminuirCantidad = useCallback((id) => {

    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
              ...item,
              cantidad: item.cantidad - 1
            }
            : item
        )
        .filter(
          (item) => item.cantidad > 0
        )
    );

  }, []);


  // ELIMINAR

  const eliminarDelCarrito = useCallback((id) => {

    setCarrito((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    toast.success(
      "Libro eliminado del carrito"
    );

  }, []);


  // VACIAR

  const vaciarCarrito = useCallback(() => {

    setCarrito([]);

    toast.success(
      "Carrito vaciado"
    );

  }, []);


  // TOTAL DE PRODUCTOS

  const totalItems = carrito.reduce(
    (acc, item) =>
      acc + item.cantidad,
    0
  );


  // TOTAL DINERO

  const totalPrecio = carrito.reduce(
    (acc, item) =>
      acc + item.precio * item.cantidad,
    0
  );


  return (

    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalItems,
        totalPrecio
      }}
    >

      {children}

    </CartContext.Provider>

  );

}


export function useCart() {

  return useContext(CartContext);

}