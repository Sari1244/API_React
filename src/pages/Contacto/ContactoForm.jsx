import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextArea from "./components/FormTextArea";
import FormFile from "./components/FormFile";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import {useState} from "react";


function ContactoForm() {
    const [mensaje, setEnviado]= useState(false);
    const {
        register, control, handleSubmit, reset,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            primerNombre: "", segundoNombre: "",
            primerApellido: "", segundoApellido: "",
            genero: "", pais: "", ciudad: "",
            correo: "", telefono: "", mensaje: "",
            archivo: [],
        },
    });

    const onSubmit = async (data) => {
        setEnviado(true);
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "archivo") {
                value.forEach((file) => formData.append("archivo", file));
            } else {
                formData.append(key, value);
            }
        });
        try {
            const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });
            if (response.ok) {
                console.log("Datos del formulario:", data);

                toast.success("¡Tu mensaje fue enviado correctamente!");
                reset();
            } else {
                // Formspree responde con { errors: [{ message: "..." }, ...] } si algo falla
                const resultado = await response.json();
                const mensajeError = resultado.errors
                    ? resultado.errors.map((e) => e.message).join(", ")
                    : "Ocurrió un error al enviar el formulario";

                toast.error(mensajeError);
            }
        } catch (error) {
            console.error("Error de red al enviar el formulario:", error);
            toast.error(mensajeError);
            
        } finally {
           setEnviado(false);
        }
    }

    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center px-4 py-10">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 md:p-10"
                >
                    {/* Mensaje de confirmación de evío */}
                    {/* {enviado && (
                        <div className="mb-6 rounded-lg bg-emererald-50 border border-emerald-200 text-emerald-700 px-4 py-3 text center font-medium">
                        toast("Hello World")✔️ Tu mensaje fue enviado correctamente
                        </div>
                    )} */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <FormInput
                            type="text"
                            label="Primer Nombre"
                            // name="primerNombre"
                            placeholder="Escribe tu Primer Nombre"
                            required
                            error={errors.primerNombre?.message}
                            {...register("primerNombre", { required: "El primer nombre es obligatorio" })}
                        />

                        <FormInput
                            type="text"
                            label="Segundo Nombre"
                            // name="segundoNombre"
                            placeholder="Escribe tu Segundo Nombre"
                            error={errors.segundoNombre?.message}
                            {...register("segundoNombre")}
                        />
                        <FormInput
                            type="text"
                            label="Primer Apellido"
                            // name="primerApellido"
                            placeholder="Escribe tu Primer Apellido"
                            required
                            error={errors.primerApellido?.message}
                            {...register("primerApellido", { required: "El primer apellido es obligatorio" })}
                        />
                        <FormInput
                            type="text"
                            label="Segundo Apellido"
                            // name="segundoApellido"
                            placeholder="Escribe tu Segundo Apellido"
                            error={errors.segundoApellido?.message}
                            {...register("segundoApellido")}
                        />
                        <FormInput
                            type="tel"
                            label="Teléfono"
                            // name="telefono"
                            placeholder="300 000 000"
                            required
                            error={errors.telefono?.message}
                            {...register("telefono", {
                                required: "El teléfono es obligatorio",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Ingresa un teléfono válido"
                                }
                            })}
                        />
                        <FormSelect
                            label="Género"
                            //name="genero"
                            options={[
                                "Femenino",
                                "Masculino",
                                "Otro"
                            ]}
                            required
                            error={errors.genero?.message}
                            {...register("genero", {
                                required: "El género es obligatorio",
                            })}
                        />

                        <FormSelect
                            label="País"
                            //name="pais"
                            options={[
                                "Colombia",
                                "Venezuela",
                                "Argentina",
                                "Bolivia",
                                "Chile",
                                "Brasil"
                            ]}
                            required
                            error={errors.pais?.message}
                            {...register("pais", {
                                required: "El país es obligatorio",
                            })}
                        />


                        <FormSelect
                            label="Ciudad"
                            //name="ciudad"
                            options={[
                                "Madrid",
                                "Medellín",
                                "Bogotá",
                                "Caracas",
                                "New York",
                                "Maracaibo"
                            ]}
                            required
                            error={errors.ciudad?.message}
                            {...register("ciudad", {
                                required: "La ciudad es obligatoria",
                            })}
                        />

                        <FormInput
                            type="email"
                            label="Correo"
                            // name="correo"
                            placeholder="nombre@correo.com"
                            required
                            error={errors.correo?.message}
                            {...register("correo", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Ingresa un correo válido"
                                }
                            })}
                        />
                        <FormTextArea
                            label="Mensaje"
                            // name="mensaje"
                            rows="5"
                            placeholder="Escribe tu mensaje aquí..."
                            required
                            error={errors.mensaje?.message}
                            {...register("mensaje", {
                                required: "El mensaje es obligatorio",
                            })}
                        ></FormTextArea>



                        {/* Archivo */}
                        <div className="md:col-span-2">
                            <Controller
                                name="archivo"
                                control={control} // 👈 viene de useForm(), es el "cerebro" que conecta todo
                                render={({ field }) => ( // 👈 aquí renderizas TU componente, y "field" trae lo necesario para conectarlo
                                    <FormFile
                                        label="Adjuntar archivo..."
                                        name="archivo"
                                        accept={{
                                            "application/pdf": [".pdf"],
                                            "image/png": [".png"],
                                            "image/jpeg": [".jpg", ".jpeg"],
                                            "video/*": [],
                                        }}
                                        maxSizeMB={5}
                                        value={field.value}
                                        onFilesChange={field.onChange} // 👈 el puente hacia react-hook-form
                                        error={errors.archivo?.message}
                                    />
                                )}
                            />
                        </div>


                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
                        >
                            Enviar mensaje
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default ContactoForm;