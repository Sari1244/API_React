import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput({label, name, type="text", required = false, placeholder="", error="",  ...rest},
    ref// 👈 segundo argumento: aquí "recogemos la carta del buzón"
){
    return(
        <div>
            <label className="block mb-2 text-sm font-medium text-slate-700" htmlFor={name}>{label}{required && "*"}</label>

            <input 
            type={type} 
            name={name}
            placeholder={placeholder}
            required={required}
            ref={ref}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            {...rest}
            />

            {error && (<span className="text-sm text-red-500">
                {error}
            </span>)}
        </div>
    )
});

export default FormInput;