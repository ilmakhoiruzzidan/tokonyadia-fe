import {forwardRef} from "react";
import PropTypes from "prop-types";
import Button from "../../../../shared/components/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import TextInput from "../../../../shared/components/TextInput.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "../schema/index.js";
import usePagination from "../../../../shared/hooks/usePagination.jsx";
import {createCategoryAction} from "../../../../redux/actions/categoryAction.js";

const ModalFormCreateCategory = forwardRef(
    ({
         title,
         onConfirm,
         onClose,
         hasConfirm,
         confirmTypeBtn = '-blue-800',
         confirmBtnText = 'Save',
         children
     },
     ref) => {
        const {
            control,
            handleSubmit,
            formState: {
                isValid,
                errors
            }
        } = useForm({
            mode: "all",
            resolver: zodResolver(createSchema),
            defaultValues: {
            }
        })
        const dispatch = useDispatch();
        const {page, size} = usePagination();
        const {isSubmitting} = useSelector(state => state.ui);


        const onSubmit = handleSubmit(async (formValues) => {
            const data = {
                ...formValues,
            }
            dispatch(createCategoryAction({
                page: page,
                size: size,
                values: data,
                onSuccess: () => {
                    onClose();
                }
            }));
        })

        return (
            <dialog
                ref={ref}
                className="modal">
                <div className="z-60 bg-white rounded-lg modal-box w-full">
                    {title && <h3 className="font-bold text-lg">{title}</h3>}
                    {children}
                    <div className="flex flex-col modal-action">
                        <form onSubmit={onSubmit} className="flex flex-col gap-4">
                            <TextInput
                                className={"flex flex-col"}
                                control={control}
                                label="Category Name"
                                name="name"
                                placeholder="Category Name..."
                                variant={'text'}
                                error={errors.name}
                            />

                            <TextInput
                                className={"flex flex-col"}
                                control={control}
                                label="Description"
                                name="description"
                                placeholder="Description..."
                                variant={'text'}
                                error={errors.description}
                            />


                            <div className="flex gap-4 justify-end">
                                <Button
                                    type='button'
                                    btnType="secondary"
                                    variant="outlined"
                                    onClick={onClose}>
                                    Close
                                </Button>
                                {hasConfirm &&
                                    <Button
                                        disabled={!isValid || isSubmitting}
                                        btnType={confirmTypeBtn}
                                        onClick={onConfirm}>
                                        {isSubmitting ? 'Saving...' : confirmBtnText}
                                    </Button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        );
    }
);

ModalFormCreateCategory.displayName = "Modal";

ModalFormCreateCategory.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    children: PropTypes.node,
    hasConfirm: PropTypes.bool,
    confirmTypeBtn: PropTypes.string,
    confirmBtnText: PropTypes.string,
}

export default ModalFormCreateCategory;