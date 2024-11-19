import {Controller} from "react-hook-form";
import PropTypes from "prop-types";

TextInput.propTypes = {
    control: PropTypes.any.isRequired,
    label: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.object,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    variant: PropTypes.string
};



function TextInput({control, label, error, name, required = false, helperText, variant = 'inline', ...rest}) {
    return (
        <div className={`flex w-full ${variant === 'inline' ? 'lg:flex-col md:flex-col gap-4' : 'flex-col gap-2'}`}>
            <div className="flex flex-col gap-2">
                <span className="flex gap-4 items-center font-medium text-gray-700">{label}
                    {required && <span className="badge badge-sm font-light">Required</span>}
                </span>
                {helperText && <small>{helperText}</small>}
            </div>
            <div className="flex flex-col">
                <Controller
                    control={control}
                    name={name}
                    render={
                        ({field}) =>
                            <input
                                {...rest}
                                {...field}
                                className={`font-light border-2 p-2 rounded-lg w-full md:w-72  focus:outline-blue-200 ${error ? 'outline-red-500 border-red-500 focus:outline-red-500' : 'outline-base-100'}`}
                                value={field.value || ''}
                                onChange={field.onChange}
                            />
                    }
                />
                {error && <small className="w-full mt-1 text-red-500">{error.message}</small>}
            </div>
        </div>
    );
}


export default TextInput;