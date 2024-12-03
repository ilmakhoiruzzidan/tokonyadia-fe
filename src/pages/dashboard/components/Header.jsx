import PropTypes from 'prop-types';
import {Bars3Icon} from "@heroicons/react/24/outline/index.js";
import useAuth from "../../../shared/hooks/useAuth.jsx";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import Modal from "../../../shared/components/Modal.jsx";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {logoutAction} from "../../../redux/actions/authAction.js";
import prof from "/src/assets/prof.jpg"

Header.propTypes = {
    onToggle: PropTypes.func
}

function Header({onToggle}) {

    const {role, clearAuthentication} = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dialogRef = useRef(null);

    const handleOpenDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    const handleLogout = async () => {
        dispatch(logoutAction({
            onSuccess: () => {
                localStorage.removeItem("accessToken");
                clearAuthentication();
                toast.success('Logout Successfully');
                navigate('/login');
            }
        }))
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
                        <Bars3Icon/>
                    </button>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0} role="button"
                            className="border-base-100 ring-1 ring-pink-500 gap-4 items-center text-gray-700 w-10 h-10 rounded-full border grid place-items-center font-bold">
                            <img src={prof} width={45} className='rounded-full'  alt="prof" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu rounded z-[1] w-52 p-2 shadow mt-4 bg-white">
                            <li><span className='font-bold'>{role}</span></li>
                            <li className="hover:bg-pink-100 rounded-md">
                                <Link
                                to={'/dashboard/users/me'}
                                >
                                    <span>Profile</span>
                                </Link>

                            </li>
                            <li onClick={handleOpenDialog} className="hover:bg-pink-100 rounded-md"><span>Logout</span></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>

    )

}

export default Header;
