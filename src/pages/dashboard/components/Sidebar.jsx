import PropTypes from "prop-types";
import {
    BuildingStorefrontIcon,
    ClipboardDocumentListIcon,
    ReceiptPercentIcon,
    Square2StackIcon,
    Square3Stack3DIcon
} from "@heroicons/react/24/outline/index.js";
import {NavLink} from "react-router-dom";
import logo from '/src/assets/logo - Edited (1).jpg';

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
}

function Sidebar({isOpen, onToggle}) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
                    onClick={onToggle}
                />
            )}

            <aside
                className={`fixed w-72 m-4 rounded-xl top-0 h-[calc(100dvh-40px)] bg-white shadow-lg transform ease-in-out duration-300 z-10 ${isOpen ? "translate-x-0" : "-translate-x-96"} overflow-y-auto`}>
                <div className="flex gap-4 mt-8 px-8">
                    <img height={48} width={48} className="rounded-lg" src={logo} alt="logo"/>
                    <h1 className="text-gray-700 flex items-center font-bold text-2xl">Tokonyadia</h1>
                </div>
                <ul className="flex flex-col px-8 gap-y-1 overflow-y-auto">
                    <p className="text-xs font-bold text-slate-400 my-4">Main Menu</p>
                    <li>
                        <NavLink
                            className={({isActive}) => `flex gap-4 items-center py-2 px-4 rounded ${isActive && 'bg-blue-800 text-white'}`}
                            to={"/dashboard"} end>
                            <Square2StackIcon className="size-5"/>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <p className="text-xs font-bold text-slate-400 my-4">Master Data</p>
                    <div className="flex flex-col gap-4">
                        <li>
                            <NavLink
                                className={({isActive}) => `flex gap-4 items-center py-2 px-4 rounded ${isActive && 'bg-blue-800 text-white'}`}
                                /*className={({isActive}) => `${&isActive && `bg-primary text-white`}*/
                                to={"/dashboard/products"}>
                                <ClipboardDocumentListIcon className="size-5"/>
                                <span>Products</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({isActive}) => `flex gap-4 items-center py-2 px-4 rounded ${isActive && 'bg-blue-800 text-white'}`}
                                to={"/dashboard/stores"}>
                                <BuildingStorefrontIcon className="size-5"/>
                                <span>Stores</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({isActive}) => `flex gap-4 items-center py-2 px-4 rounded ${isActive && 'bg-blue-800 text-white'}`}
                                to={"/dashboard/categories"}>
                                <Square3Stack3DIcon className="size-5"/>
                                <span>Categories</span>
                            </NavLink>
                        </li>
                    </div>
                    <p className="text-xs font-bold text-slate-400 my-4">Transaction</p>
                    <li>
                        <NavLink
                            className={({isActive}) => `flex gap-4 items-center py-2 px-4 rounded ${isActive && 'bg-blue-800 text-white'}`}
                            to={"/dashboard/orders"}>
                            <ReceiptPercentIcon className="size-5"/>
                            <span>Orders</span>
                        </NavLink>
                    </li>
                </ul>
            </aside>
        </>

    )
}

export default Sidebar;