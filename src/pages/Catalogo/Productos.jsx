import { useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import BookCard from "../../components/Catalogo/BookCard";
import BookDetail from "../../components/Catalogo/BookDetail";

function Productos() {

    const [genero, setGenero] = useState("todos");
    const [pagina, setPagina] = useState(1);
    const [orden, setOrden] = useState("popularidad");

    const [libroSeleccionado, setLibroSeleccionado] = useState(null);

    const {
        libros,
        totalResultados,
        cargando,
        error,
        librosPorPagina
    } = useBooks(genero, pagina, orden);

    const totalPaginas = Math.ceil(
        totalResultados / librosPorPagina
    );


    function cambiarGenero(e) {
        setGenero(e.target.value);
        setPagina(1);
    }


    function cambiarOrden(e) {
        setOrden(e.target.value);
        setPagina(1);
    }


    const primerResultado =
        totalResultados === 0
            ? 0
            : (pagina - 1) * librosPorPagina + 1;


    const ultimoResultado = Math.min(
        pagina * librosPorPagina,
        totalResultados
    );


    return (
        <section
            className="
                min-h-screen
                bg-[#FFF8F5]
                dark:bg-[#2B1711]
                px-6
                py-10
                transition-colors
                duration-300
            "
        >

            <div className="max-w-7xl mx-auto">

                {/* ENCABEZADO */}

                <div className="mb-8 text-center">

                    <h2
                        className="
                            text-3xl
                            font-bold
                            text-[#7A3622]
                            dark:text-[#FFD2BE]
                        "
                    >
                        Nuestra biblioteca
                    </h2>

                    <p
                        className="
                            text-[#7A3622]/70
                            dark:text-[#FFD2BE]/70
                            mt-2
                        "
                    >
                        Explora libros de diferentes géneros y descubre nuevas historias.
                    </p>

                </div>


                {/* FILTROS */}

                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        gap-4
                        mb-8
                        justify-center
                        text-center
                    "
                >

                    {/* FILTRO DE GÉNERO */}

                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="genero"
                            className="
                                text-sm
                                font-semibold
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            "
                        >
                            Género
                        </label>

                        <select
                            id="genero"
                            value={genero}
                            onChange={cambiarGenero}
                            className="
                                rounded-xl
                                border
                                border-[#FFD2BE]
                                bg-white
                                px-4
                                py-3
                                text-[#7A3622]
                                outline-none
                                focus:ring-2
                                focus:ring-[#F38562]
                                dark:bg-[#3B2119]
                                dark:border-[#7A3622]
                                dark:text-[#FFD2BE]
                            "
                        >

                            <option value="todos">
                                Todos
                            </option>

                            <option value="classics">
                                Clásicos
                            </option>

                            <option value="romance">
                                Romance
                            </option>

                            <option value="mystery">
                                Misterio
                            </option>

                            <option value="horror">
                                Terror
                            </option>

                            <option value="science_fiction">
                                Ciencia ficción
                            </option>

                            <option value="fantasy">
                                Fantasía
                            </option>

                            <option value="adventure">
                                Aventura
                            </option>

                            <option value="history">
                                Historia
                            </option>

                            <option value="poetry">
                                Poesía
                            </option>

                            <option value="drama">
                                Teatro
                            </option>

                        </select>

                    </div>


                    {/* ORDEN */}

                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="orden"
                            className="
                                text-sm
                                font-semibold
                                text-[#7A3622]
                                dark:text-[#FFD2BE]
                            "
                        >
                            Ordenar por
                        </label>

                        <select
                            id="orden"
                            value={orden}
                            onChange={cambiarOrden}
                            className="
                                rounded-xl
                                border
                                border-[#FFD2BE]
                                bg-white
                                px-4
                                py-3
                                text-[#7A3622]
                                outline-none
                                focus:ring-2
                                focus:ring-[#F38562]
                                dark:bg-[#3B2119]
                                dark:border-[#7A3622]
                                dark:text-[#FFD2BE]
                            "
                        >

                            <option value="popularidad">
                                Más populares
                            </option>

                            <option value="new">
                                Más recientes
                            </option>

                            <option value="old">
                                Más antiguos
                            </option>

                        </select>

                    </div>

                </div>


                {/* CARGANDO */}

                {cargando && (

                    <div
                        className="
                            py-20
                            text-center
                            text-[#F38562]
                            font-medium
                        "
                    >
                        Cargando libros...
                    </div>

                )}


                {/* ERROR */}

                {error && (

                    <p
                        className="
                            py-10
                            text-center
                            text-red-500
                        "
                    >
                        {error}
                    </p>

                )}


                {/* LIBROS */}

                {!cargando && !error && (

                    <>

                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                xl:grid-cols-4
                                gap-7
                            "
                        >

                            {libros.map((libro) => (

                                <BookCard
                                    key={libro.key}
                                    libro={libro}
                                    onVerDetalle={setLibroSeleccionado}
                                />

                            ))}

                        </div>


                        {/* INFORMACIÓN DE RESULTADOS */}

                        <div
                            className="
                                mt-10
                                text-center
                                text-sm
                                text-[#7A3622]/70
                                dark:text-[#FFD2BE]/70
                            "
                        >

                            Mostrando{" "}

                            <strong>
                                {primerResultado}
                            </strong>

                            {" – "}

                            <strong>
                                {ultimoResultado}
                            </strong>

                            {" de "}

                            <strong>
                                {totalResultados.toLocaleString()}
                            </strong>

                            {" libros"}

                        </div>


                        {/* PAGINACIÓN */}

                        {totalPaginas > 1 && (

                            <div
                                className="
                                    mt-5
                                    flex
                                    flex-col
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        flex-wrap
                                    "
                                >

                                    {/* BOTÓN ANTERIOR */}

                                    <button
                                        type="button"
                                        disabled={pagina === 1}
                                        onClick={() =>
                                            setPagina(
                                                (actual) => actual - 1
                                            )
                                        }
                                        className="
                                            rounded-xl
                                            px-4
                                            py-2
                                            font-semibold
                                            bg-[#FFD2BE]
                                            text-[#7A3622]
                                            disabled:opacity-40
                                            disabled:cursor-not-allowed
                                            hover:bg-[#F38562]
                                            hover:text-white
                                            transition-colors
                                        "
                                    >
                                        ←
                                    </button>


                                    {/* NÚMEROS DE PÁGINA */}

                                    {(() => {

                                        const paginasVisibles = 5;

                                        let inicio = Math.max(
                                            1,
                                            pagina - 2
                                        );

                                        let fin = Math.min(
                                            totalPaginas,
                                            inicio + paginasVisibles - 1
                                        );


                                        if (
                                            fin - inicio + 1 <
                                            paginasVisibles
                                        ) {

                                            inicio = Math.max(
                                                1,
                                                fin - paginasVisibles + 1
                                            );

                                        }


                                        return (

                                            <>

                                                {/* PRIMERA PÁGINA */}

                                                {inicio > 1 && (

                                                    <>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setPagina(1)
                                                            }
                                                            className="
                                                                rounded-xl
                                                                px-4
                                                                py-2
                                                                font-semibold
                                                                bg-[#FFD2BE]
                                                                text-[#7A3622]
                                                                hover:bg-[#F38562]
                                                                hover:text-white
                                                                transition-colors
                                                            "
                                                        >
                                                            1
                                                        </button>


                                                        {inicio > 2 && (

                                                            <span
                                                                className="
                                                                    px-1
                                                                    text-[#7A3622]
                                                                    dark:text-[#FFD2BE]
                                                                "
                                                            >
                                                                ...
                                                            </span>

                                                        )}

                                                    </>

                                                )}


                                                {/* PÁGINAS CENTRALES */}

                                                {Array.from(
                                                    {
                                                        length:
                                                            fin -
                                                            inicio +
                                                            1
                                                    },
                                                    (_, indice) => {

                                                        const numeroPagina =
                                                            inicio +
                                                            indice;


                                                        return (

                                                            <button
                                                                key={
                                                                    numeroPagina
                                                                }
                                                                type="button"
                                                                onClick={() =>
                                                                    setPagina(
                                                                        numeroPagina
                                                                    )
                                                                }
                                                                className={`
                                                                    rounded-xl
                                                                    px-4
                                                                    py-2
                                                                    font-semibold
                                                                    transition-colors

                                                                    ${
                                                                        pagina ===
                                                                        numeroPagina
                                                                            ? "bg-[#F38562] text-white"
                                                                            : "bg-[#FFD2BE] text-[#7A3622] hover:bg-[#F38562] hover:text-white"
                                                                    }
                                                                `}
                                                            >
                                                                {
                                                                    numeroPagina
                                                                }
                                                            </button>

                                                        );

                                                    }
                                                )}


                                                {/* ÚLTIMA PÁGINA */}

                                                {fin <
                                                    totalPaginas && (

                                                    <>

                                                        {fin <
                                                            totalPaginas -
                                                                1 && (

                                                            <span
                                                                className="
                                                                    px-1
                                                                    text-[#7A3622]
                                                                    dark:text-[#FFD2BE]
                                                                "
                                                            >
                                                                ...
                                                            </span>

                                                        )}


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setPagina(
                                                                    totalPaginas
                                                                )
                                                            }
                                                            className="
                                                                rounded-xl
                                                                px-4
                                                                py-2
                                                                font-semibold
                                                                bg-[#FFD2BE]
                                                                text-[#7A3622]
                                                                hover:bg-[#F38562]
                                                                hover:text-white
                                                                transition-colors
                                                            "
                                                        >
                                                            {
                                                                totalPaginas
                                                            }
                                                        </button>

                                                    </>

                                                )}

                                            </>

                                        );

                                    })()}


                                    {/* BOTÓN SIGUIENTE */}

                                    <button
                                        type="button"
                                        disabled={
                                            pagina === totalPaginas
                                        }
                                        onClick={() =>
                                            setPagina(
                                                (actual) => actual + 1
                                            )
                                        }
                                        className="
                                            rounded-xl
                                            px-4
                                            py-2
                                            font-semibold
                                            bg-[#FFD2BE]
                                            text-[#7A3622]
                                            disabled:opacity-40
                                            disabled:cursor-not-allowed
                                            hover:bg-[#F38562]
                                            hover:text-white
                                            transition-colors
                                        "
                                    >
                                        →
                                    </button>

                                </div>


                                {/* PÁGINA ACTUAL */}

                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-[#7A3622]/70
                                        dark:text-[#FFD2BE]/70
                                    "
                                >
                                    Página {pagina} de {totalPaginas}
                                </p>

                            </div>

                        )}

                    </>

                )}

            </div>


            {/* DETALLE DEL LIBRO */}

            {libroSeleccionado && (

                <BookDetail
                    libro={libroSeleccionado}
                    onCerrar={() =>
                        setLibroSeleccionado(null)
                    }
                />

            )}

        </section>
    );
}

export default Productos;