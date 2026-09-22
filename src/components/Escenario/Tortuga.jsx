function Tortuga({ posicion }) {
 return (
    <div
        style={{
        fontSize: "60px",
        position: "relative",
        marginTop: "210px",
        left: `${posicion}px`,
        transition: "left 0.2s"
        }}
    >
    🐈‍⬛ 
    
    </div>
    );
}

export default Tortuga;