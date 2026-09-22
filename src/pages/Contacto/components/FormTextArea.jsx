import { forwardRef } from "react";

const FormTextArea = forwardRef(function FormTextArea({ label, name, rows, placeholder = "", required = false, error = "", ...rest }, ref) {
    return (
        <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-slate-700">{label} {required && "*"}</label>
            <textarea
                rows={rows}
                name={name}
                placeholder={placeholder}
                required={required}
                ref={ref}
                className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                {...rest}
            >
            </textarea>
            {error && (<span className="text-sm text-red-500">
                {error}
            </span>)}
        </div>
    )
});

export default FormTextArea;