import ContactoForm from './ContactoForm';

function Contacto() {
    return (
        <div className="bg-[#FFF8F5] dark:bg-[#2B1711] transition-colors duration-300 bg-slate-100 text-2xl pt-4">

            <div className="text-center">
                <h1 className="text-[#7A3622] dark:text-[#FFD2BE] text-3xl font-bold text-slate-800">
                    Contáctanos
                </h1>

                <p className="dark:text-[#FFD2BE]/80 mt-2 text-slate-500">
                    Completa el formulario y nos pondremos en contacto contigo.
                </p>
            </div>
            {/* Formulario */}
            <ContactoForm />
        </div>

    );
}

export default Contacto;