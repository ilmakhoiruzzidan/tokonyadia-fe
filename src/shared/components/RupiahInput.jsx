import PropTypes from 'prop-types';
import {Controller} from "react-hook-form";
import {formatRupiah} from "../utils/currencyUtil.js";

RupiahInput.propTypes = {
    control: PropTypes.any.isRequired,
    label: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.object,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool
};

function RupiahInput({control, label, error, name, required = false, helperText, ...rest}) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <span className="flex gap-4 items-center text-gray-700 font-medium">{label}
                    {required && <span className="badge badge-sm font-light">Required</span>}
                </span>
                {helperText && <small>{helperText}</small>}
            </div>
            <div className="col-span-2">
                <Controller
                    control={control}
                    name={name}
                    defaultValue=""
                    render={
                        ({field}) =>
                            <input
                                {...rest}
                                {...field}
                                type="text"
                                className={`font-light border-2 p-2 rounded-lg w-full focus:outline-blue-200 ${error ? 'outline-red-500 border-red-500 focus:outline-red-500' : 'outline-base-100'}`}
                                value={field.value ? formatRupiah(field.value, "Rp. ") : ""}
                                onChange={(e) => {
                                    const formattedValue = formatRupiah(e.target.value, "Rp. ");
                                    field.onChange(formattedValue);
                                }}
                                placeholder="Rp0,00"
                            />
                    }
                />
                {error && <small className="text-red-500">{error.message}</small>}
            </div>
        </div>
    );
}

export default RupiahInput;