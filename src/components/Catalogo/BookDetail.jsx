import { useEffect, useState } from "react";
import { X, ShoppingCart, LoaderCircle } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });
}

export default function BookDetail({ libro, onCerrar }) {

    const { agregarAlCarrito } = useCart();
    const [descripcion, setDescripcion] = useState("");
    const [cargandoDescripcion, setCargandoDescripcion] = useState(true);

    useEffect(() => {
        async function cargarDescripcion() {
            try {

                setCargandoDescripcion(true);

                const res = await fetch(
                    `https://openlibrary.org${libro.key}.json`);

                if (!res.ok) {
                    throw new Error("No se pudo cargar el detalle");
                }

                const data = await res.json();

                if (typeof data.description === "string") {
                    setDescripcion(data.description);
                } else if (data.description?.value) {
                    setDescripcion(data.description.value);
                } else {
                    setDescripcion(
                        "Sinopsis no disponible para este libro."
                    );
                }

            } catch {
                setDescripcion(
                    "No fue posible cargar la sinopsis."
                );

            } finally {
                setCargandoDescripcion(false);
            }
        }

        cargarDescripcion();

    }, [libro]);

    function manejarAgregar() {
        agregarAlCarrito(libro);
    }

    return (
        <div
            className="
                fixed inset-0
                z-50
                bg-black/50
                backdrop-blur-sm
                flex
                items-center
                justify-center
                p-6
            "
            onClick={onCerrar}
        >

            <article
                className="
                    relative
                    w-full
                    max-w-4xl
                    max-h-[90vh]
                    overflow-y-auto
                    bg-[#FFF8F5]
                    dark:bg-[#3B2119]
                    rounded-3xl
                    shadow-2xl
                    p-6
                    md:p-8
                    transition-colors
                "
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    type="button"
                    onClick={onCerrar}
                    className="
                        absolute
                        top-4
                        right-4
                        p-2
                        rounded-full
                        bg-[#FFD2BE]
                        text-[#7A3622]
                        hover:bg-[#F38562]
                        hover:text-white
                        transition-colors
                    "
                    title="Cerrar"
                >
                    <X size={20} />
                </button>

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-8
                    mt-4
                ">

                    <div className="
                        bg-[#FFD2BE]/30
                        dark:bg-[#2B1711]
                        rounded-2xl
                        p-5
                        flex
                        items-center
                        justify-center
                    ">

                        {libro.cover_i ? (
                            <img
                                src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`}
                                alt={libro.title}
                                className="
                                    max-h-125
                                    w-auto
                                    max-w-full
                                    object-contain
                                    rounded-xl
                                    shadow-lg
                                "
                            />
                        ) : (
                            <p className="text-[#7A3622] dark:text-[#FFD2BE]">
                                Sin portada
                            </p>
                        )}

                    </div>

                    <div className="flex flex-col">

                        <span className="
                            inline-block
                            self-start
                            px-3
                            py-1
                            rounded-full
                            bg-[#FFD2BE]
                            text-[#7A3622]
                            text-sm
                            font-semibold
                        ">
                            Libro
                        </span>

                        <h2 className="
                            mt-4
                            text-3xl
                            font-bold
                            text-[#7A3622]
                            dark:text-[#FFD2BE]
                        ">
                            {libro.title}
                        </h2>

                        <p className="
                            mt-3
                            text-[#F38562]
                            font-medium
                        ">
                            {libro.author_name?.join(", ") || "Autor desconocido"}
                        </p>

                        <div className="
                            mt-5
                            space-y-2
                            text-[#7A3622]/80
                            dark:text-[#FFD2BE]/80
                        ">

                            <p>
                                <strong>Publicado:</strong>{" "}
                                {libro.first_publish_year || "No disponible"}
                            </p>

                            <p>
                                <strong>Ediciones:</strong>{" "}
                                {libro.edition_count || "No disponible"}
                            </p>

                        </div>

                        <div className="mt-7">

                            <h3 className="
                                text-lg
                                font-bold
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            ">
                                Sinopsis
                            </h3>

                            {cargandoDescripcion ? (
                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    mt-3
                                    text-[#F38562]
                                ">
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Cargando sinopsis...
                                </div>
                            ) : (
                                <p className="
                                    mt-3
                                    leading-relaxed
                                    text-[#7A3622]/75
                                    dark:text-[#FFD2BE]/75
                                ">
                                    {descripcion}
                                </p>
                            )}

                        </div>

                        <div className="
                            mt-auto
                            pt-8
                            flex
                            items-center
                            justify-between
                            gap-4
                        ">

                            <span className="
                                text-2xl
                                font-bold
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            ">
                                {formatearPrecio(libro.precio)}
                            </span>

                            <button
                                type="button"
                                onClick={manejarAgregar}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-[#F38562]
                                    text-white
                                    font-semibold
                                    hover:bg-[#7A3622]
                                    transition-colors
                                "
                            >
                                <ShoppingCart size={19} />

                                Agregar al carrito
                            </button>

                        </div>

                    </div>

                </div>

            </article>

        </div>
    );
}