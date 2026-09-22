import { forwardRef } from "react";


const FormSelect = forwardRef(function FormSelect({ label, name, id, options = [], required = false, error="", ...rest }, ref) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">{label} {required && "*"}</label>
            <select
                name={name}
                id={id}
                required={required}
                ref={ref}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                {...rest}
            >

                <option value="" disabled defaultValue>Selecciona una opción</option>

                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}

            </select>

            {error && (<span className="text-sm text-red-500">
                {error}
            </span>)}
            
        </div>
    )
});

export default FormSelect;