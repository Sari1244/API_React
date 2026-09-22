import {X,Plus,Minus,Trash2,ShoppingBag} from "lucide-react";
import { useCart } from "../../contexts/CartContext"
import toast from "react-hot-toast";

function formatearPrecio(valor) {

    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });

}

export default function CartPanel({abierto,onCerrar}) {
    const {
        carrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalPrecio
    } = useCart();


    function realizarCompra() {
        if (carrito.length === 0) {
            toast.error(
                "Tu carrito está vacío"
            );
            return;
        }


        toast.success(
            "¡Compra realizada correctamente!"
        );

        vaciarCarrito();

        onCerrar();

    }


    if (!abierto) {
        return null;
    }


    return (

        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/40
                backdrop-blur-sm
            "
            onClick={onCerrar}
        >

            <aside
                className="
                    absolute
                    right-0
                    top-0
                    h-full
                    w-full
                    sm:w-105
                    bg-[#FFF8F5]
                    dark:bg-[#2B1711]
                    shadow-2xl
                    flex
                    flex-col
                    transition-colors
                "
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {/* CABECERA */}

                <div className="
                    flex
                    items-center
                    justify-between
                    p-5
                    border-b
                    border-[#FFD2BE]
                    dark:border-[#7A3622]
                ">

                    <div className="flex items-center gap-2">

                        <ShoppingBag
                            className="text-[#F38562]"
                        />

                        <h2 className="
                            text-xl
                            font-bold
                            text-[#7A3622]
                            dark:text-[#FFD2BE]
                        ">
                            Mi carrito
                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={onCerrar}
                        className="
                            p-2
                            rounded-full
                            text-[#7A3622]
                            dark:text-[#FFD2BE]
                            hover:bg-[#FFD2BE]
                            transition-colors
                        "
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* PRODUCTOS */}

                <div className="
                    flex-1
                    overflow-y-auto
                    p-5
                ">

                    {carrito.length === 0 ? (

                        <div className="
                            h-full
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                        ">

                            <ShoppingBag
                                size={50}
                                className="text-[#FFD2BE]"
                            />

                            <h3 className="
                                mt-4
                                font-bold
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            ">
                                Tu carrito está vacío
                            </h3>

                            <p className="
                                mt-2
                                text-sm
                                text-[#7A3622]/60
                                dark:text-[#FFD2BE]/60
                            ">
                                Agrega algunos libros para comenzar.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {carrito.map((item) => (

                                <article
                                    key={item.id}
                                    className="
                                        flex
                                        gap-3
                                        bg-white
                                        dark:bg-[#3B2119]
                                        rounded-2xl
                                        p-3
                                        ring-1
                                        ring-[#FFD2BE]
                                        dark:ring-[#7A3622]
                                    "
                                >

                                    {item.image && (

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="
                                                w-20
                                                h-28
                                                object-cover
                                                rounded-lg
                                            "
                                        />

                                    )}


                                    <div className="flex-1 min-w-0">

                                        <h3 className="
                                            font-semibold
                                            text-[#7A3622]
                                            dark:text-[#FFD2BE]
                                            line-clamp-2
                                        ">
                                            {item.name}
                                        </h3>


                                        <p className="
                                            mt-1
                                            text-[#F38562]
                                            font-bold
                                        ">
                                            {formatearPrecio(item.precio)}
                                        </p>


                                        <div className="
                                            mt-3
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                            ">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        disminuirCantidad(item.id)
                                                    }
                                                    className="
                                                        w-7
                                                        h-7
                                                        rounded-full
                                                        bg-[#FFD2BE]
                                                        text-[#7A3622]
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-[#F38562]
                                                        hover:text-white
                                                    "
                                                >
                                                    <Minus size={14} />
                                                </button>


                                                <span className="
                                                    font-semibold
                                                    text-[#7A3622]
                                                    dark:text-[#FFD2BE]
                                                ">
                                                    {item.cantidad}
                                                </span>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        aumentarCantidad(item.id)
                                                    }
                                                    className="
                                                        w-7
                                                        h-7
                                                        rounded-full
                                                        bg-[#FFD2BE]
                                                        text-[#7A3622]
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-[#F38562]
                                                        hover:text-white
                                                    "
                                                >
                                                    <Plus size={14} />
                                                </button>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    eliminarDelCarrito(item.id)
                                                }
                                                className="
                                                    p-2
                                                    rounded-full
                                                    text-[#F38562]
                                                    hover:bg-[#FFD2BE]
                                                "
                                                title="Eliminar"
                                            >
                                                <Trash2 size={17} />
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </div>


                {/* PIE */}

                {carrito.length > 0 && (

                    <div className="
                        border-t
                        border-[#FFD2BE]
                        dark:border-[#7A3622]
                        p-5
                    ">

                        <div className="
                            flex
                            justify-between
                            items-center
                            mb-4
                        ">

                            <span className="
                                text-[#7A3622]/70
                                dark:text-[#FFD2BE]/70
                            ">
                                Total
                            </span>

                            <span className="
                                text-2xl
                                font-bold
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            ">
                                {formatearPrecio(totalPrecio)}
                            </span>

                        </div>


                        <button
                            type="button"
                            onClick={realizarCompra}
                            className="
                                w-full
                                py-3
                                rounded-xl
                                bg-[#F38562]
                                text-white
                                font-bold
                                hover:bg-[#7A3622]
                                transition-colors
                            "
                        >
                            Comprar
                        </button>


                        <button
                            type="button"
                            onClick={vaciarCarrito}
                            className="
                                w-full
                                mt-2
                                py-2
                                text-sm
                                text-[#F38562]
                                hover:text-[#7A3622]
                            "
                        >
                            Vaciar carrito
                        </button>

                    </div>

                )}

            </aside>

        </div>

    );

}