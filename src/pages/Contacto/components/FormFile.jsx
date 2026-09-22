import { useEffect, useEffectEvent, useState } from "react";
import { useDropzone } from "react-dropzone";

function FormFile({ label, name, required = false, error = "", maxSizeMB = 2, maxFiles = 3, onFilesChange = () => {}, value={}, accept = { "application/pdf": [".pdf"] } }) {

    // El id esta hecho con nombre, fecha de modificación y tamaño
    const generarId = (file) =>
        `${file.name}-${file.lastModified}-${file.size}`;

    // Mensaje cuando se elimina el archivo
    const [mensajeEliminado, setMensajeEliminado] = useState("");

    // Estado para guardar el mensaje de error de validación (tipo/tamaño)
    const [errorMsg, setErrorMsg] = useState("");

    const [archivos, setArchivos] = useState([]);

    useEffect(()=> {
        if (value.length === 0 && archivos.length > 0){
            setArchivos([]);
        }
    }, [value]);

    // Cada vez que la lista cambia, avisamos hacia afuera
    useEffect(() => {
        onFilesChange(archivos.map((a) => a.file));
    }, [archivos]);

    useEffect(() => {
        if (!mensajeEliminado) return;

        const temporizador = setTimeout(() => {
            setMensajeEliminado("");
        }, 3000);

        return () => clearTimeout(temporizador);
    }, [mensajeEliminado]);


    const espacioDisponible = maxFiles - archivos.length;

    const limiteArchivos = espacioDisponible <= 0;

    const onDrop = (acceptedFiles, rejectedFiles) => {

        if (acceptedFiles.length > 0) {
            const nuevosArchivos = acceptedFiles
                .slice(0, espacioDisponible)
                .map((file) => {
                    let preview = null;

                    if (file.type.startsWith("image/")) {
                        preview = URL.createObjectURL(file);
                    }

                    return {
                        id: generarId(file),
                        file: file,
                        preview: preview
                    };
                });

            setArchivos((anterioresArchivos) => [
                ...anterioresArchivos,
                ...nuevosArchivos
            ]);

            setErrorMsg("");
        }
        console.log(acceptedFiles);

        if (rejectedFiles.length > 0) {
            const primerError = rejectedFiles[0].errors[0];

            if (primerError.code === "file-too-large") {
                setErrorMsg(`El archivo supera el tamaño máximo de ${maxSizeMB}MB`);
            } else if (primerError.code === "file-invalid-type") {
                setErrorMsg("Tipo de archivo no permitido");
            } else if (primerError.code === "too-many-files") {
                setErrorMsg(`Ya alcanzaste el máximo de ${maxFiles} archivos`);
            } else {
                setErrorMsg(primerError.message);
            }
        }
        console.log({ acceptedFiles, rejectedFiles });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        maxSize: maxSizeMB * 1024 * 1024, // dropzone trabaja en bytes
        maxFiles,
        accept,
        disabled: limiteArchivos
    });

    const eliminarArchivo = (id) => {
        setArchivos((anteriores) => {

            const archivoAEliminar = anteriores.find(
                (archivo) => archivo.id === id
            );

            // Si tiene preview, se libera la URL
            if (archivoAEliminar?.preview) {
                URL.revokeObjectURL(archivoAEliminar.preview);
            }

            return anteriores.filter(
                (archivo) => archivo.id !== id
            );
        });

        setMensajeEliminado("Archivo eliminado");
    };

    return (
        <div className="md:col-span-2">
            <label className="block mb-2.5 text-base font-medium">{label} {required && "*"}</label>

            {/* Contenedor del Dropzone */}
            <div
                {...getRootProps()}
                className={`bg-gray-50 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center transition
                    ${limiteArchivos
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:border-sky-400"
                    }
                `}
            >
                <input {...getInputProps({
                    id: name,
                    name: name,
                    required: required && archivos.length === 0
                })}
                />

                <div className="text-4xl mb-3">
                    📎
                </div>
                <p className="font-medium text-slate-700">
                    Arrastra tus archivos aquí
                </p>

                <p className="my-2 text-red-500 font-bold">
                    Archivos seleccionados: {archivos.length} / {maxFiles}
                </p>

                <p className="font-medium text-slate-700">
                    O haz click para seleccionarlos
                </p>
            </div>

            {
                archivos.map(({ id, file, preview }) => (
                    <div
                        key={id}
                        className="mt-3 rounded-lg bg-slate-100 p-4 flex items-center justify-between gap-4"
                    >
                        <div className="text-left">
                            <p className="font-semibold text-slate-700 mb-2">
                                Archivo seleccionado
                            </p>
                            <p> <strong>Nombre:</strong> {file.name} </p>
                            <p> <strong>Tipo:</strong> {file.type}   </p>
                            <p> <strong>Tamaño:</strong>{" "}
                                {(file.size / 1024).toFixed(2)} KB </p>
                            <p><strong>Última modificación:</strong> {file.lastModified}</p>
                        </div>

                        {/* Vista previa de las imagenes */}
                        {preview && (
                            <img
                                src={preview}
                                alt={`Vista previa de ${file.name}`}
                                className="w-50 h-50 object-cover rounded-lg border border-slate-200 shrink-0 ml-auto"
                            />
                        )}

                        <button
                            type="button"
                            className="cursor-pointer text-2xl"
                            onClick={() => eliminarArchivo(id)}
                        >
                          ❌  
                        </button>

                    </div>
                ))
            }

            {
                mensajeEliminado && (
                    <p className="mt-3 text-sm text-green-600 font-medium">
                        {mensajeEliminado}
                    </p>
                )
            }

            {
                (errorMsg || error) && (
                    <span className="text-sm text-red-500">
                        {errorMsg || error}
                    </span>
                )
            }



        </div >
    )
}

export default FormFile;