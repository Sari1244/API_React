import { ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });
}

export default function BookCard({ libro, onVerDetalle }) {

    const { agregarAlCarrito } = useCart();
    function manejarAgregar() {
        agregarAlCarrito(libro);
    }

    return (
        <article
            onClick={() => onVerDetalle(libro)}
            className="
                group
                bg-white dark:bg-[#3B2119]
                rounded-2xl
                shadow-sm
                ring-1 ring-[#FFD2BE]
                dark:ring-[#7A3622]
                overflow-hidden
                hover:shadow-xl
                hover:-translate-y-1
                transition-all duration-300
                cursor-pointer
            "
        >

            <div className="relative bg-[#FFF8F5] dark:bg-[#2B1711] h-72 flex items-center justify-center overflow-hidden">

                {libro.cover_i ? (
                    <img
                        src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`}
                        alt={libro.title}
                        className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-500
                        "
                    />
                ) : (
                    <div className="text-[#7A3622] dark:text-[#FFD2BE]">
                        Sin portada
                    </div>
                )}

                <span
                    className="
                absolute
                top-3
                left-3
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                bg-[#FFD2BE]/95
                text-[#7A3622]
                shadow-sm
            "
                >
                    Libro
                </span>

            </div>

            <div className="p-5">

                <h3 className="
                    font-semibold
                    text-[#7A3622]
                    dark:text-[#FFD2BE]
                    text-lg
                    leading-tight
                    line-clamp-2
                ">
                    {libro.title}
                </h3>

                <ul className="
                    mt-3
                    space-y-1
                    text-sm
                    text-[#7A3622]/70
                    dark:text-[#FFD2BE]/70
                ">

                    <li>
                        <span className="text-[#F38562] font-medium">
                            Autor:
                        </span>{" "}
                        {libro.author_name?.join(", ") || "Desconocido"}
                    </li>

                    <li>
                        <span className="text-[#F38562] font-medium">
                            Publicado:
                        </span>{" "}
                        {libro.first_publish_year || "No disponible"}
                    </li>

                </ul>

                <div className="mt-5 flex items-center justify-between">

                    <span className="
                        text-[#7A3622]
                        dark:text-[#FFD2BE]
                        font-bold
                        text-lg
                    ">
                        {formatearPrecio(libro.precio)}
                    </span>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            manejarAgregar();
                        }}
                        className="
                            p-2.5
                            rounded-full
                            bg-[#F38562]
                            text-white
                            hover:bg-[#7A3622]
                            dark:hover:bg-[#FFD2BE]
                            dark:hover:text-[#7A3622]
                            transition-colors
                            shadow-sm
                        "
                        title="Agregar al carrito"
                    >
                        <ShoppingCart size={18} />
                    </button>

                </div>

            </div>

        </article>
    );
}