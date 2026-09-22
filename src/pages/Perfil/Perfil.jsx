import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Camera, LogOut, Mail, Pencil, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

function Perfil() {

    const {
        usuario,
        cerrarSesion,
        actualizarPerfil
    } = useAuth();

    const navigate = useNavigate();

    const inputFoto = useRef(null);

    const [editando, setEditando] = useState(false);

    const [datosEditados, setDatosEditados] = useState({
        nombre: usuario?.nombre || "",
        apellido: usuario?.apellido || "",
        correo: usuario?.correo || "",
    });


    function manejarCambio(event) {

        const { name, value } = event.target;

        setDatosEditados((actual) => ({
            ...actual,
            [name]: value,
        }));
    }


    function guardarCambios() {

        if (
            !datosEditados.nombre.trim() ||
            !datosEditados.apellido.trim() ||
            !datosEditados.correo.trim()
        ) {
            toast.error("Completa todos los campos");
            return;
        }

        actualizarPerfil(datosEditados);

        setEditando(false);

        toast.success("Perfil actualizado");
    }


    function cancelarEdicion() {

        setDatosEditados({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
        });

        setEditando(false);
    }


    function manejarFoto(event) {

        const archivo = event.target.files[0];

        if (!archivo) return;

        if (!archivo.type.startsWith("image/")) {
            toast.error("Selecciona una imagen válida");
            return;
        }

        const lector = new FileReader();

        lector.onload = () => {

            actualizarPerfil({
                foto: lector.result,
            });

            toast.success("Foto de perfil actualizada");
        };

        lector.readAsDataURL(archivo);
    }


    function manejarCerrarSesion() {

        cerrarSesion();

        toast.success("Sesión cerrada");

        navigate("/login");
    }


    if (!usuario) {

        return (
            <section className="min-h-[calc(100vh-100px)] bg-[#FFF8F5] dark:bg-[#1F120D] px-6 py-12">

                <div className="mx-auto max-w-md text-center">

                    <h1 className="text-2xl font-bold text-[#7A3622] dark:text-[#FFD2BE]">
                        No has iniciado sesión
                    </h1>

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-6 rounded-xl bg-[#F38562] px-6 py-3 font-bold text-white hover:bg-[#7A3622]"
                    >
                        Ir al Login
                    </button>

                </div>

            </section>
        );
    }


    return (

        <section className="min-h-[calc(100vh-100px)] bg-[#FFF8F5] dark:bg-[#1F120D] px-6 py-12 transition-colors">

            <div className="mx-auto max-w-2xl">

                <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-[#FFD2BE] dark:bg-[#3B2119] dark:ring-[#7A3622]">

                    <div className="h-32 bg-[#F38562] dark:bg-[#7A3622]" />


                    <div className="-mt-16 px-8 pb-8">

                        {/* FOTO */}

                        <div className="relative mx-auto h-32 w-32">

                            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#FFD2BE] text-[#7A3622] shadow-lg dark:border-[#3B2119] dark:bg-[#7A3622] dark:text-[#FFD2BE]">

                                {usuario.foto ? (

                                    <img
                                        src={usuario.foto}
                                        alt="Foto de perfil"
                                        className="h-full w-full object-cover"
                                    />

                                ) : (

                                    <User size={55} />

                                )}

                            </div>


                            <button
                                type="button"
                                onClick={() => inputFoto.current.click()}
                                className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#F38562] text-white shadow-md transition hover:bg-[#7A3622]"
                                title="Cambiar foto"
                            >
                                <Camera size={18} />
                            </button>


                            <input
                                ref={inputFoto}
                                type="file"
                                accept="image/*"
                                onChange={manejarFoto}
                                className="hidden"
                            />

                        </div>


                        {/* INFORMACIÓN */}

                        <div className="mt-5 text-center">

                            {!editando ? (

                                <>
                                    <h1 className="text-3xl font-bold text-[#7A3622] dark:text-[#FFD2BE]">
                                        {usuario.nombre} {usuario.apellido}
                                    </h1>

                                    <div className="mt-3 flex items-center justify-center gap-2 text-[#7A3622]/70 dark:text-[#FFD2BE]/70">
                                        <Mail size={17} />
                                        <span>{usuario.correo}</span>
                                    </div>
                                </>

                            ) : (

                                <div className="mx-auto max-w-md space-y-4 text-left">

                                    <div>
                                        <label className="mb-1 block font-medium text-[#7A3622] dark:text-[#FFD2BE]">
                                            Nombre
                                        </label>

                                        <input
                                            name="nombre"
                                            type="text"
                                            value={datosEditados.nombre}
                                            onChange={manejarCambio}
                                            className="w-full rounded-xl border border-[#FFD2BE] bg-[#FFF8F5] px-4 py-3 outline-none focus:border-[#F38562] dark:border-[#7A3622] dark:bg-[#2B1711] dark:text-white"
                                        />
                                    </div>


                                    <div>
                                        <label className="mb-1 block font-medium text-[#7A3622] dark:text-[#FFD2BE]">
                                            Apellido
                                        </label>

                                        <input
                                            name="apellido"
                                            type="text"
                                            value={datosEditados.apellido}
                                            onChange={manejarCambio}
                                            className="w-full rounded-xl border border-[#FFD2BE] bg-[#FFF8F5] px-4 py-3 outline-none focus:border-[#F38562] dark:border-[#7A3622] dark:bg-[#2B1711] dark:text-white"
                                        />
                                    </div>


                                    <div>
                                        <label className="mb-1 block font-medium text-[#7A3622] dark:text-[#FFD2BE]">
                                            Correo
                                        </label>

                                        <input
                                            name="correo"
                                            type="email"
                                            value={datosEditados.correo}
                                            onChange={manejarCambio}
                                            className="w-full rounded-xl border border-[#FFD2BE] bg-[#FFF8F5] px-4 py-3 outline-none focus:border-[#F38562] dark:border-[#7A3622] dark:bg-[#2B1711] dark:text-white"
                                        />
                                    </div>

                                </div>

                            )}

                        </div>


                        {/* BOTONES */}

                        <div className="mt-8 flex justify-center gap-3">

                            {!editando ? (

                                <button
                                    type="button"
                                    onClick={() => setEditando(true)}
                                    className="flex items-center gap-2 rounded-xl bg-[#F38562] px-5 py-3 font-semibold text-white transition hover:bg-[#7A3622]"
                                >
                                    <Pencil size={18} />
                                    Editar perfil
                                </button>

                            ) : (

                                <>

                                    <button
                                        type="button"
                                        onClick={guardarCambios}
                                        className="flex items-center gap-2 rounded-xl bg-[#F38562] px-5 py-3 font-semibold text-white transition hover:bg-[#7A3622]"
                                    >
                                        <Save size={18} />
                                        Guardar cambios
                                    </button>


                                    <button
                                        type="button"
                                        onClick={cancelarEdicion}
                                        className="flex items-center gap-2 rounded-xl border border-[#FFD2BE] px-5 py-3 font-semibold text-[#7A3622] transition hover:bg-[#FFF8F5] dark:border-[#7A3622] dark:text-[#FFD2BE] dark:hover:bg-[#2B1711]"
                                    >
                                        <X size={18} />
                                        Cancelar
                                    </button>

                                </>

                            )}

                        </div>


                        {/* CERRAR SESIÓN */}

                        <button
                            type="button"
                            onClick={manejarCerrarSesion}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 py-3 font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
                        >
                            <LogOut size={18} />
                            Cerrar sesión
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Perfil;