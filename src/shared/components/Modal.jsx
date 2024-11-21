import {forwardRef} from "react";
import PropTypes from "prop-types";
import Button from "./Button.jsx";
import {useSelector} from "react-redux";

const Modal = forwardRef(
    ({
         title,
         onConfirm,
         onClose,
         hasConfirm,
         confirmTypeBtn = '-blue-800',
         confirmBtnText = 'Confirm',
         children
     },
     ref) => {
        const {isSubmitting} = useSelector(state => state.ui);

        return (
            <dialog ref={ref} className="modal">
                <div className="z-60 bg-white rounded-lg modal-box w-full">
                    {title && <h3 className="font-bold text-lg">{title}</h3>}
                    {children}
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-4">
                            <Button btnType="secondary" variant="outlined" onClick={onClose}>Close
                            </Button>
                            {hasConfirm &&
                                <Button
                                    disabled={isSubmitting}
                                    btnType={confirmTypeBtn}
                                    onClick={onConfirm}>
                                    {isSubmitting ? 'Loading...' : confirmBtnText}
                                </Button>
                            }
                        </form>
                    </div>
                </div>
            </dialog>
        );
    }
);

Modal.displayName = "Modal";

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    children: PropTypes.node,
    hasConfirm: PropTypes.bool,
    confirmTypeBtn: PropTypes.string,
    confirmBtnText: PropTypes.string,
}

export default Modal;