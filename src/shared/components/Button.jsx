import PropTypes from "prop-types";


Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    btnType: PropTypes.string,
    className: PropTypes.string,
}

const mapClassClassic = {
    'primary': 'bg-blue-800 text-white',
    'secondary': 'bg-gray-500 text-white',  // Gray for secondary
    'info': 'bg-teal-500 text-white',       // Teal for info
    'success': 'bg-green-500 text-white',   // Green for success
    'warning': 'bg-amber-500 text-white',   // Amber for warning
    'error': 'bg-red-500 text-white',       // Red for error
    'default': 'bg-pink-500 text-white',    // Pink as the fallback
};

const mapClassOutlined = {
    'primary': 'outline outline-1 outline-white text-white',
    'secondary': 'outline outline-1 outline-gray-500 text-gray-500',  // Gray for secondary
    'info': 'outline outline-1 outline-teal-500 text-teal-500',       // Teal for info
    'success': 'outline outline-1 outline-green-500 text-green-500',   // Green for success
    'warning': 'outline outline-1 outline-amber-500 text-amber-500',   // Amber for warning
    'error': 'outline outline-1 outline-red-500 text-red-500',         // Red for error
    'default': 'outline outline-1 outline-pink-500 text-pink-500',     // Pink for default
};

function Button({children, className, btnType = 'primary', variant = 'classic', ...rest}) {
    const buttonClass = variant === 'classic'
        ? mapClassClassic[btnType] || mapClassClassic['default']
        : mapClassOutlined[btnType] || mapClassOutlined['default'];
    return (
        <button className={
            `${buttonClass} ${className} disabled:bg-base-300 disabled:text-white disabled:cursor-not-allowed py-2 px-8 rounded`
        } {...rest}>{children}</button>
    );
}

export default Button;