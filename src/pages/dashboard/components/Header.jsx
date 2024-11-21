import PropTypes from 'prop-types';
import {Bars3CenterLeftIcon} from "@heroicons/react/24/outline/index.js";
import useAuth from "../../../shared/hooks/useAuth.jsx";
import authService from "../../../services/authService.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import Modal from "../../../shared/components/Modal.jsx";
import {useRef} from "react";

Header.propTypes = {
    onToggle: PropTypes.func
}

function Header({onToggle}) {

    const {clearAuthentication} = useAuth();
    const navigate = useNavigate();
    const dialogRef = useRef(null);

    const handleOpenDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    const handleLogout = async () => {
        try {
            await authService.logout();
            clearAuthentication();
            toast.success("Logout successfully.");
            navigate('/login');
        } catch (e) {
            toast.error(e.response?.data.message);
        }
    }

    return (
        <>
            <Modal
                title={"Logout"}
                ref={dialogRef}
                hasConfirm
                onConfirm={handleLogout}
                confirmBtnText={"Logout"}>
                <p className="py-4">Are you sure want to logout?</p>
            </Modal>
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
                            <li onClick={handleOpenDialog} className="hover:bg-gray-100 rounded-md"><span>Logout</span></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>

    )

}

export default Header;
