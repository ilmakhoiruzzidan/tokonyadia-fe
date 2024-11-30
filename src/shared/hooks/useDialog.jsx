import {useRef, useState} from "react";

function useDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const handleOpen = (onOpenCallBack) => {
        if (ref.current) {
            setIsOpen(true);
            ref.current.showModal();
            if (onOpenCallBack) {
                onOpenCallBack();
            }
        }
    }

    const handleClose = () => {
        if (ref.current) {
            setIsOpen(false);
            ref.current.close();
        }
    }

    return {
        ref,
        isOpen,
        handleOpen,
        handleClose
    }
}

export default useDialog;