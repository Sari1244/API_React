import { useState, useEffect } from "react";

const RANGO_PRECIO = {
    min: 7000,
    max: 50000
};

const LIBROS_POR_PAGINA = 12;

function precioAleatorio() {
    return Math.floor(
        Math.random() * (RANGO_PRECIO.max - RANGO_PRECIO.min + 1)
    ) + RANGO_PRECIO.min;
}

export function useBooks(
    genero = "todos",
    pagina = 1,
    orden = "popularidad"
) {
    const [libros, setLibros] = useState([]);
    const [totalResultados, setTotalResultados] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let activo = true;

        async function cargarLibros() {
            try {
                setCargando(true);
                setError(null);

                let consulta = "";

                if (genero === "todos") {
                    consulta = "subject:fiction";
                } else {
                    consulta = `subject:${genero}`;
                }

                const parametros = new URLSearchParams({
                    q: consulta,
                    page: pagina,
                    limit: LIBROS_POR_PAGINA,
                    sort: orden === "popularidad"
                        ? "rating"
                        : orden
                });

                const resLibros = await fetch(
                    `https://openlibrary.org/search.json?${parametros.toString()}`
                );

                if (!resLibros.ok) {
                    throw new Error("No se pudo cargar el catálogo");
                }

                const dataLibros = await resLibros.json();

                const lista = dataLibros.docs
                    .filter((libro) => libro.cover_i)
                    .map((libro) => ({
                        ...libro,
                        precio: precioAleatorio(),
                    }));

                if (activo) {
                    setLibros(lista);
                    setTotalResultados(dataLibros.num_found || 0);
                }

            } catch (err) {
                if (activo) {
                    setError(err.message);
                    setLibros([]);
                    setTotalResultados(0);
                }

            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarLibros();

        return () => {
            activo = false;
        };

    }, [genero, pagina, orden]);

    return {
        libros,
        totalResultados,
        cargando,
        error,
        librosPorPagina: LIBROS_POR_PAGINA
    };
}