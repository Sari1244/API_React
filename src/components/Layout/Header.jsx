import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon, ShoppingCart, User, } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import Navbar from "./Navbar";
import "./Layout.css";
import Logo from "../../assets/book.jpg";
import { useState } from "react";
import CartPanel from "../carrito/CartPanel";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

function Header() {
    const { usuario, cerrarSesion } = useAuth();
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);
    const { tema, cambiarTema } = useTheme();
    const { totalItems } = useCart();
    const navigate = useNavigate();

    async function manejarCerrarSesion() {
        const resultado = await Swal.fire({
            title: "¿Cerrar sesión?",
            text: "¿Está seguro de que desea cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
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

        cerrarSesion();
        setMenuUsuarioAbierto(false);

        navigate("/login");

        Swal.fire({
            title: "Sesión cerrada",
            text: "Has cerrado sesión correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#F38562",
            background: "#FFF8F5",
            color: "#7A3622",
        });
    }

    return (
        <header className="header">

            {/* LOGO */}
            <Link className="logo" to="/">
                <img
                    src={Logo}
                    alt="Logo de Lectulandia"
                />
            </Link>

            {/* NOMBRE
            <div className="text-3xl">
                <h2>Lectulandia</h2>
            </div> */}

            {/* MENÚ */}
            <Navbar />

            {/* ACCIONES */}
            <div className="header-actions">

                <div className="login-container">

                    {/* CARRITO */}
                    <button
                        type="button"
                        onClick={() =>
                            setCarritoAbierto(true)
                        }
                        className="relative p-2"
                        title="Ver carrito"
                    >
                        <ShoppingCart size={20} />

                        {totalItems > 0 && (
                            <span
                                className="
                                    absolute
                                    -top-1
                                    -right-1
                                    bg-[#F38562]
                                    text-white
                                    text-xs
                                    font-bold
                                    rounded-full
                                    w-5
                                    h-5
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* MODO */}
                    <button
                        type="button"
                        onClick={cambiarTema}
                        title={
                            tema === "claro"
                                ? "Cambiar a modo oscuro"
                                : "Cambiar a modo claro"
                        }
                        className="
                            p-2
                            rounded-full
                            hover:bg-slate-700/20
                            transition-colors
                        "
                    >
                        {tema === "claro" ? (
                            <Moon size={20} />
                        ) : (
                            <Sun size={20} />
                        )}
                    </button>

                    {/* USUARIO / LOGIN */}
                    {usuario ? (
                        <div className="relative">

                            <button
                                type="button"
                                onClick={() =>
                                    setMenuUsuarioAbierto(
                                        !menuUsuarioAbierto
                                    )
                                }
                                className="
                                    p-2
                                    rounded-full
                                    hover:bg-slate-700/20
                                    transition-colors
                                "
                                title="Usuario"
                            >
                                <User size={21} />
                            </button>

                            {menuUsuarioAbierto && (
                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-12
                                        z-50
                                        w-44
                                        rounded-xl
                                        bg-white
                                        dark:bg-[#3B2119]
                                        shadow-xl
                                        border
                                        border-[#FFD2BE]
                                        dark:border-[#7A3622]
                                        overflow-hidden
                                    "
                                >

                                    {/* PERFIL */}
                                    <Link
                                        to="/perfil"
                                        onClick={() =>
                                            setMenuUsuarioAbierto(false)
                                        }
                                        className="
                                            block
                                            px-4
                                            py-3
                                            text-sm
                                            font-semibold
                                            text-[#7A3622]
                                            dark:text-[#FFD2BE]
                                            hover:bg-[#FFF8F5]
                                            dark:hover:bg-[#2B1711]
                                        "
                                    >
                                        Mi perfil
                                    </Link>

                                    {/* CERRAR SESIÓN */}
                                    <button
                                        type="button"
                                        onClick={manejarCerrarSesion}
                                        className="
                                            w-full
                                            text-left
                                            px-4
                                            py-3
                                            text-sm
                                            font-semibold
                                            text-[#F38562]
                                            hover:bg-[#FFF8F5]
                                            dark:hover:bg-[#2B1711]
                                        "
                                    >
                                        Cerrar sesión
                                    </button>

                                </div>
                            )}

                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="
                                rounded-xl
                                bg-[#F38562]
                                px-4
                                py-2
                                font-semibold
                                text-white
                                transition
                                hover:bg-[#7A3622]
                            "
                        >
                            Login
                        </Link>
                    )}

                </div>

            </div>

            {/* PANEL DEL CARRITO */}
            <CartPanel
                abierto={carritoAbierto}
                onCerrar={() =>
                    setCarritoAbierto(false)
                }
            />

        </header>
    );
}

export default Header;