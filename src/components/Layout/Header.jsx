import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import Navbar from "./Navbar";
import "./Layout.css";
import Logo from "../../assets/book.jpg";
import { useState } from "react";
import CartPanel from "../Carrito/CartPanel";
import { useAuth } from "../../contexts/AuthContext";

function Header({ pagina, setPagina }) {
    const { usuario } = useAuth();
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const { tema, cambiarTema } = useTheme();
    const { totalItems } = useCart();

    return (
        <header className="header">

            <Link className="logo" to={"/"}>
                <img src={Logo} alt="logo" />
            </Link>

            <Navbar />

            <div className="header-actions">
                <div className="login-container">
                    <button
                        type="button"
                        onClick={() => setCarritoAbierto(true)}
                        className="relative p-2"
                        title="Ver carrito"
                    >
                        <ShoppingCart size={20} />

                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#F38562] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={cambiarTema}
                        title={
                            tema === "claro"
                                ? "Cambiar a modo oscuro"
                                : "Cambiar a modo claro"
                        }
                        className="p-2 rounded-full hover:bg-slate-700/20 transition-colors"
                    >
                        {tema === "claro"
                            ? <Moon size={20} />
                            : <Sun size={20} />
                        }
                    </button>
                </div>

                {usuario ? (
                    <Link
                        to="/perfil"
                        className="rounded-xl bg-[#F38562] px-4 py-2 font-semibold text-white transition hover:bg-[#7A3622]"
                    >
                        Mi perfil
                    </Link>

                ) : (

                    <Link
                        to="/login"
                        className="rounded-xl bg-[#F38562] px-4 py-2 font-semibold text-white transition hover:bg-[#7A3622]"
                    >
                        Login
                    </Link>

                )}

            </div>


            <CartPanel
                abierto={carritoAbierto}
                onCerrar={() => setCarritoAbierto(false)}
            />

        </header>
    );
}

export default Header;