import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const CLAVE_USUARIO = "usuario_libros";

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem(CLAVE_USUARIO);

        return usuarioGuardado
            ? JSON.parse(usuarioGuardado)
            : null;
    });

    useEffect(() => {
        if (usuario) {
            localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
        } else {
            localStorage.removeItem(CLAVE_USUARIO);
        }
    }, [usuario]);

    function iniciarSesion(datos) {
        setUsuario(datos);
    }

    function cerrarSesion() {
        setUsuario(null);
    }

    function actualizarPerfil(datos) {
        setUsuario((actual) => ({
            ...actual,
            ...datos,
        }));
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                iniciarSesion,
                cerrarSesion,
                actualizarPerfil,
                estaAutenticado: Boolean(usuario),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}