import { Link } from 'react-router-dom';

function Navbar({setPagina}) {
    return (
         <nav className="flex items-center gap-2 rounded-full bg-slate-800/60 p-2 backdrop-blur-sm">
            
            <Link
                to="/escenario"
                className="rounded-full px-5 py-2 font-medium text-gray-300
                           transition-all duration-300
                           hover:bg-white/10 hover:text-white"
            >
                Diviértete
            </Link>

            <Link
                to="/catalogo"
                className="rounded-full px-5 py-2 font-medium text-gray-300
                           transition-all duration-300
                           hover:bg-white/10 hover:text-white"
            >
                Catálogo
            </Link>

            <Link
                to="/contacto"
                className="rounded-full px-5 py-2 font-medium text-gray-300
                           transition-all duration-300
                           hover:bg-white/10 hover:text-white"
            >
                Contacto
            </Link>
        </nav>
    );
}

export default Navbar;