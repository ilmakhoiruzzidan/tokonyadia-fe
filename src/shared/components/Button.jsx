import PropTypes from "prop-types";


Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    btnType: PropTypes.string,
    className: PropTypes.string,
}

const mapClassClassic = {
    'primary': 'bg-blue-800 text-white',
    'secondary': 'bg-gray-500 text-white',
    'info': 'bg-teal-500 text-white',
    'success': 'bg-green-500 text-white',
    'warning': 'bg-amber-500 text-white',
    'error': 'bg-red-500 text-white',
    'default': 'bg-pink-500 text-white',
};

const mapClassOutlined = {
    'primary': 'outline outline-1 outline-white text-white',
    'secondary': 'outline outline-1 outline-gray-500 text-gray-500',
    'info': 'outline outline-1 outline-teal-500 text-teal-500',
    'success': 'outline outline-1 outline-green-500 text-green-500',
    'warning': 'outline outline-1 outline-amber-500 text-amber-500',
    'error': 'outline outline-1 outline-red-500 text-red-500',
    'default': 'outline outline-1 outline-pink-500 text-pink-500',
};

function Button({children, className, btnType = 'primary', variant = 'classic', ...rest}) {
    const buttonClass = variant === 'classic'
        ? mapClassClassic[btnType] || mapClassClassic['default']
        : mapClassOutlined[btnType] || mapClassOutlined['default'];
    return (
        <button className={
            `${buttonClass} ${className} disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed py-2 px-3 rounded-xl`
        } {...rest}>{children}</button>
    );
}

export default Button;