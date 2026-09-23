import { X, Plus, Minus, Trash2, ShoppingBag, } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });
}

function CartPanel({ abierto, onCerrar }) {

    const {
        carrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        subtotal,
        iva,
        totalPrecio,
    } = useCart();

    async function realizarCompra() {

        if (carrito.length === 0) {
            toast.error("El carrito está vacío");
            return;
        }

        const resultado = await Swal.fire({
            title: "¿Realizar compra?",
            text: "¿Está seguro de que desea realizar esta compra?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, comprar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#F38562",
            cancelButtonColor: "#7A3622",
            reverseButtons: true,
            background: "#FFF8F5",
            color: "#7A3622",
        });

        if (!resultado.isConfirmed) {
            return;
        }

        try {

            vaciarCarrito(false);

            await Swal.fire({
                title: "¡Compra realizada!",
                text: "Tu compra se realizó correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#F38562",
                background: "#FFF8F5",
                color: "#7A3622",
            });

            onCerrar();

        } catch (error) {

            console.error(
                "Error al realizar la compra:",
                error
            );

            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al realizar la compra.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#F38562",
                background: "#FFF8F5",
                color: "#7A3622",
            });
        }
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
            "
        >

            {/* PANEL */}
            <aside
                className="
                    fixed
                    right-0
                    top-0
                    h-full
                    w-full
                    max-w-md
                    bg-[#FFF8F5]
                    dark:bg-[#2B1711]
                    shadow-2xl
                    flex
                    flex-col
                "
            >

                {/* HEADER DEL CARRITO */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        p-5
                        border-b
                        border-[#FFD2BE]
                        dark:border-[#7A3622]
                    "
                >

                    <div className="flex items-center gap-2">

                        <ShoppingBag
                            size={22}
                            className="
                                text-[#F38562]
                            "
                        />

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            "
                        >
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
                <div
                    className="
                        flex-1
                        overflow-y-auto
                        p-5
                    "
                >

                    {carrito.length === 0 ? (

                        <div
                            className="
                                h-full
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-center
                            "
                        >

                            <ShoppingBag
                                size={50}
                                className="
                                    text-[#FFD2BE]
                                "
                            />

                            <h3
                                className="
                                    mt-4
                                    font-bold
                                    text-[#7A3622]
                                    dark:text-[#FFD2BE]
                                "
                            >
                                Tu carrito está vacío
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-[#7A3622]/60
                                    dark:text-[#FFD2BE]/60
                                "
                            >
                                Agrega libros para
                                comenzar tu pedido.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {carrito.map((item) => {

                                const subtotalItem =
                                    item.precio *
                                    item.cantidad;

                                return (
                                    <div
                                        key={item.id}
                                        className="
                                            rounded-2xl
                                            border
                                            border-[#FFD2BE]
                                            dark:border-[#7A3622]
                                            bg-white
                                            dark:bg-[#3B2119]
                                            p-4
                                        "
                                    >

                                        {/* PRODUCTO */}
                                        <div
                                            className="
                                                flex
                                                gap-4
                                            "
                                        >

                                            {/* IMAGEN */}
                                            <div
                                                className="
                                                    w-20
                                                    h-28
                                                    flex-shrink-0
                                                    overflow-hidden
                                                    rounded-lg
                                                    bg-[#FFD2BE]
                                                "
                                            >

                                                {item.image ? (

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="
                                                            w-full
                                                            h-full
                                                            object-cover
                                                        "
                                                    />

                                                ) : (

                                                    <div
                                                        className="
                                                            w-full
                                                            h-full
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-[#7A3622]
                                                        "
                                                    >
                                                        <ShoppingBag />
                                                    </div>

                                                )}

                                            </div>

                                            {/* INFORMACIÓN */}
                                            <div
                                                className="
                                                    flex-1
                                                "
                                            >

                                                <h3
                                                    className="
                                                        font-bold
                                                        text-[#7A3622]
                                                        dark:text-[#FFD2BE]
                                                        line-clamp-2
                                                    "
                                                >
                                                    {item.name}
                                                </h3>

                                                {/* PRECIO UNITARIO */}
                                                <p
                                                    className="
                                                        mt-2
                                                        text-sm
                                                        text-[#7A3622]/70
                                                        dark:text-[#FFD2BE]/70
                                                    "
                                                >
                                                    Precio unitario:{" "}
                                                    {formatearPrecio(
                                                        item.precio
                                                    )}
                                                </p>

                                                {/* SUBTOTAL DEL PRODUCTO */}
                                                <p
                                                    className="
                                                        mt-1
                                                        text-sm
                                                        font-semibold
                                                        text-[#F38562]
                                                    "
                                                >
                                                    Subtotal:{" "}
                                                    {formatearPrecio(
                                                        subtotalItem
                                                    )}
                                                </p>

                                            </div>

                                            {/* ELIMINAR */}
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    const resultado = await Swal.fire({
                                                        title: "¿Eliminar libro?",
                                                        text: `¿Quieres eliminar "${item.name}" del carrito?`,
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonText: "Sí, eliminar",
                                                        cancelButtonText: "Cancelar",
                                                        confirmButtonColor: "#F38562",
                                                        cancelButtonColor: "#7A3622",
                                                        reverseButtons: true,
                                                        background: "#FFF8F5",
                                                        color: "#7A3622",
                                                    });

                                                    if (resultado.isConfirmed) {
                                                        eliminarDelCarrito(item.id);

                                                        await Swal.fire({
                                                            title: "¡Eliminado!",
                                                            text: `"${item.name}" fue eliminado del carrito.`,
                                                            icon: "success",
                                                            confirmButtonText: "Aceptar",
                                                            confirmButtonColor: "#F38562",
                                                            background: "#FFF8F5",
                                                            color: "#7A3622",
                                                        });
                                                    }
                                                }}
                                                className="
                                                    h-fit
                                                    p-2
                                                    text-[#F38562]
                                                    hover:text-[#7A3622]
                                                "
                                                title="Eliminar"
                                            >
                                                <Trash2
                                                    size={18}
                                                />
                                            </button>

                                        </div>

                                        {/* CANTIDAD */}
                                        <div
                                            className="
                                                mt-4
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >

                                            <span
                                                className="
                                                    text-sm
                                                    font-semibold
                                                    text-[#7A3622]
                                                    dark:text-[#FFD2BE]
                                                "
                                            >
                                                Cantidad
                                            </span>

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                "
                                            >

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        disminuirCantidad(
                                                            item.id
                                                        )
                                                    }
                                                    className="
                                                        w-8
                                                        h-8
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
                                                    <Minus
                                                        size={16}
                                                    />
                                                </button>

                                                <span
                                                    className="
                                                        min-w-6
                                                        text-center
                                                        font-bold
                                                        text-[#7A3622]
                                                        dark:text-[#FFD2BE]
                                                    "
                                                >
                                                    {item.cantidad}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        aumentarCantidad(
                                                            item.id
                                                        )
                                                    }
                                                    className="
                                                        w-8
                                                        h-8
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
                                                    <Plus
                                                        size={16}
                                                    />
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}

                </div>

                {/* RESUMEN */}
                {carrito.length > 0 && (

                    <div
                        className="
                            border-t
                            border-[#FFD2BE]
                            dark:border-[#7A3622]
                            p-5
                            bg-white
                            dark:bg-[#3B2119]
                        "
                    >

                        {/* SUBTOTAL */}
                        <div
                            className="
                                flex
                                justify-between
                                text-sm
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            "
                        >
                            <span>Subtotal</span>

                            <span>
                                {formatearPrecio(
                                    subtotal
                                )}
                            </span>
                        </div>

                        {/* IVA */}
                        <div
                            className="
                                mt-2
                                flex
                                justify-between
                                text-sm
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            "
                        >
                            <span>
                                IVA (19%)
                            </span>

                            <span>
                                {formatearPrecio(
                                    iva
                                )}
                            </span>
                        </div>

                        {/* TOTAL */}
                        <div
                            className="
                                mt-4
                                flex
                                justify-between
                                text-lg
                                font-bold
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            "
                        >
                            <span>
                                Total a pagar
                            </span>

                            <span>
                                {formatearPrecio(
                                    totalPrecio
                                )}
                            </span>
                        </div>

                        {/* ENVIAR PEDIDO */}
                        <button
                            type="button"
                            onClick={realizarCompra}
                            className="
                            w-full
                            mt-5
                            py-3
                            rounded-xl
                            bg-[#7A3622]
                            text-white
                            font-semibold
                            shadow-md
                            hover:bg-[#F38562]
                            hover:shadow-lg
                            transition-all
                            duration-200
                            flex
                            items-center
                            justify-center
                            gap-2   
                        "
                        >
                            <ShoppingBag size={19} />
                            Comprar
                        </button>

                        {/* VACIAR */}
                        <button
                            type="button"
                            onClick={async () => {

                                const resultado = await Swal.fire({
                                    title: "¿Vaciar carrito?",
                                    text: "Se eliminarán todos los libros del carrito.",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Sí, vaciar carrito",
                                    cancelButtonText: "Cancelar",
                                    confirmButtonColor: "#F38562",
                                    cancelButtonColor: "#7A3622",
                                    reverseButtons: true,
                                    background: "#FFF8F5",
                                    color: "#7A3622",
                                });

                                if (resultado.isConfirmed) {
                                    vaciarCarrito();
                                }

                            }}
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

export default CartPanel;