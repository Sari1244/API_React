
import Tortuga from "../../components/Escenario/Tortuga";
import BotonDerecho from "../../components/Escenario/BotonDerecho";
import { useState } from "react";
import './Escenario.css';
import BotonIzquierda from "../../components/Escenario/BotonIzquierdo";
import BotonInicio from "../../components/Escenario/BotonInicio";



function Escenario() {

    const [posicion, setPosicion] = useState(0);

    function moverDerecha() {
        if (posicion < 270) {
            setPosicion(posicion + 10);
        }
    }
    function moverIzquierda() {
        if (posicion > -270) {
            setPosicion(posicion - 10);
        }
    }
    function moverInicio() {
        setPosicion(0);
    }

    return (
        <>
            <div className="mt-4 text-center text-[#7A3622] dark:text-[#FFD2BE] text-3xl font-bold text-slate-800">
                <h2>Juego Interactivo</h2>
            </div>
            <div className="escenario">

                <Tortuga posicion={posicion} />

                <div className="botones">
                    <BotonIzquierda mover={moverIzquierda} />
                    <BotonInicio mover={moverInicio} />
                    <BotonDerecho mover={moverDerecha} />
                </div>

                <p className="posicion">Posición: {posicion}px</p>
            </div>
        </>

    )
}


export default Escenario;