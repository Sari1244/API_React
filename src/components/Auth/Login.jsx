function Login(){
    return(
        <div>
            <form action="">
                <label htmlFor="">Nombre</label>
                <input type="text" />

                <label htmlFor="">Apellido</label>
                <input type="text" /> 

                <label htmlFor="">Género</label>
                <input type="text" /> 

                <label htmlFor="">Edad</label>
                <input type="number" />  

                <label htmlFor="">Correo</label>
                <input type="email" /> 

                <label htmlFor="">Contraseña</label>
                <input type="password" />                

            </form>
        </div>
    )
}

export default Login;