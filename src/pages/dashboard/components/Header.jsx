import PropTypes from 'prop-types';
import {Bars3CenterLeftIcon} from "@heroicons/react/24/outline/index.js";

Header.propTypes = {
    onToggle: PropTypes.func
}

function Header({onToggle}) {
    return (
        <header>
            <div className="flex justify-between mx-auto h-20 items-center">
                <button
                    className={"p-1 size-10 sm:invisible}"}
                    onClick={() => onToggle()}>
                    <Bars3CenterLeftIcon/>
                </button>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0} role="button"
                        className="border-base-100 ring-1 ring-gray-500 gap-4 cursor-pointer items-center text-gray-700 w-10 h-10 rounded-full border grid place-items-center font-bold">AW
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded z-[1] w-52 p-2 shadow mt-4 bg-white">
                        <li className="hover:bg-gray-100 rounded-md"><span>Profile</span></li>
                        <li className="hover:bg-gray-100 rounded-md"><span>Logout</span></li>
                    </ul>
                </div>
            </div>
        </header>
    )

}

export default Header;
