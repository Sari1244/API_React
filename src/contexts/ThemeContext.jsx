import {createContext,useContext,useState,useEffect} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [tema, setTema] = useState(() => {
        return localStorage.getItem("tema") || "claro";
    });

    const cambiarTema = () => {
        setTema((actual) =>
            actual === "claro"
                ? "oscuro"
                : "claro"
        );
    };

    useEffect(() => {

        const root = document.documentElement;

        if (tema === "oscuro") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("tema", tema);

    }, [tema]);

    return (
        <ThemeContext.Provider
            value={{
                tema,
                cambiarTema
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}