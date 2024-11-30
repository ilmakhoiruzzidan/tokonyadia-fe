import PropTypes from 'prop-types';
import {Controller} from "react-hook-form";

BasicSelect.propTypes = {
    control: PropTypes.any.isRequired,
    label: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.object,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    options: PropTypes.array.isRequired
};

function BasicSelect({control, label, error, name, required = false, helperText, options, ...rest}) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <span className="flex gap-4 items-center text-gray-600 font-medium">{label}
                </span>
            </div>
            <div className="col-span-2">
                <Controller
                    control={control}
                    name={name}
                    render={
                        ({field}) =>
                            <select
                                {...rest}
                                {...field}
                                className={`border py-1.5 px-2 rounded w-full ${error ? 'outline-red-500 border-red-500' : 'outline-none'}`}
                                value={field.value || ''}
                                onChange={field.onChange}>
                                <option value="">{rest.placeholder || 'Select...'}</option>
                                {
                                    options.map((opt, index) => (
                                        <option key={index} value={opt.value}>{opt.label}</option>
                                    ))
                                }
                            </select>
                    }
                />
                {error && <small className="text-red-500">{error.message}</small>}
            </div>
        </div>
    );
}

export default BasicSelect;