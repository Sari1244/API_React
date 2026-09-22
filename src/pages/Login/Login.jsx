import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { iniciarSesion } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    function onSubmit(datos) {
        const usuario = {
            nombre: datos.nombre,
            apellido: datos.apellido,
            correo: datos.correo,
            foto: "",
        };

        iniciarSesion(usuario);

        toast.success(`¡Bienvenido, ${datos.nombre}!`);

        navigate("/");
    }

    return (
        <section className="min-h-[calc(100vh-100px)] bg-[#FFF8F5] dark:bg-[#1F120D] px-6 py-12 transition-colors">
            <div className="mx-auto max-w-md">

                <div className="rounded-3xl bg-white dark:bg-[#3B2119] p-8 shadow-xl ring-1 ring-[#FFD2BE] dark:ring-[#7A3622]">

                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD2BE] text-[#7A3622] dark:bg-[#7A3622] dark:text-[#FFD2BE]">
                            <User size={30} />
                        </div>

                        <h1 className="text-3xl font-bold text-[#7A3622] dark:text-[#FFD2BE]">
                            Iniciar sesión
                        </h1>

                        <p className="mt-2 text-sm text-[#7A3622]/70 dark:text-[#FFD2BE]/70">
                            Entra a tu cuenta de la librería
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        <div>
                            <label className="mb-2 block font-medium text-[#7A3622] dark:text-[#FFD2BE]">
                                Nombre
                            </label>

                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F38562]"
                                />

                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    className="w-full rounded-xl border border-[#FFD2BE] bg-[#FFF8F5] py-3 pl-10 pr-4 outline-none transition focus:border-[#F38562] dark:border-[#7A3622] dark:bg-[#2B1711] dark:text-white"
                                    {...register("nombre", {
                                        required: "El nombre es obligatorio",
                                        minLength: {
                                            value: 2,
                                            message: "El nombre debe tener al menos 2 caracteres",
                                        },
                                    })}
                                />
                            </div>

                            {errors.nombre && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.nombre.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-[#7A3622] dark:text-[#FFD2BE]">
                                Apellido
                            </label>

                            <input
                                type="text"
                                placeholder="Tu apellido"
                                className="w-full rounded-xl border border-[#FFD2BE] bg-[#FFF8F5] px-4 py-3 outline-none transition focus:border-[#F38562] dark:border-[#7A3622] dark:bg-[#2B1711] dark:text-white"
                                {...register("apellido", {
                                    required: "El apellido es obligatorio",
                                    minLength: {
                                        value: 2,
                                        message: "El apellido debe tener al menos 2 caracteres",
                                    },
                                })}
                            />

                            {errors.apellido && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.apellido.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-[#7A3622] dark:text-[#FFD2BE]">
                                Correo
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F38562]"
                                />

                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="w-full rounded-xl border border-[#FFD2BE] bg-[#FFF8F5] py-3 pl-10 pr-4 outline-none transition focus:border-[#F38562] dark:border-[#7A3622] dark:bg-[#2B1711] dark:text-white"
                                    {...register("correo", {
                                        required: "El correo es obligatorio",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Ingresa un correo válido",
                                        },
                                    })}
                                />
                            </div>

                            {errors.correo && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.correo.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-[#7A3622] dark:text-[#FFD2BE]">
                                Contraseña
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F38562]"
                                />

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-[#FFD2BE] bg-[#FFF8F5] py-3 pl-10 pr-4 outline-none transition focus:border-[#F38562] dark:border-[#7A3622] dark:bg-[#2B1711] dark:text-white"
                                    {...register("password", {
                                        required: "La contraseña es obligatoria",
                                        minLength: {
                                            value: 6,
                                            message: "La contraseña debe tener al menos 6 caracteres",
                                        },
                                    })}
                                />
                            </div>

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#F38562] py-3 font-bold text-white transition hover:bg-[#7A3622] dark:hover:bg-[#FFD2BE] dark:hover:text-[#7A3622]"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[#7A3622]/70 dark:text-[#FFD2BE]/70">
                        ¿No quieres iniciar sesión todavía?{" "}
                        <Link
                            to="/catalogo"
                            className="font-semibold text-[#F38562] hover:underline"
                        >
                            Ver catálogo
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;