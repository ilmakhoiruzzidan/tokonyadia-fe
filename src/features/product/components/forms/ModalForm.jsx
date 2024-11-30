import {forwardRef, useState} from "react";
import PropTypes from "prop-types";
import Button from "../../../../shared/components/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import TextInput from "../../../../shared/components/TextInput.jsx";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "../../schema/index.js";
import RupiahInput from "../../../../shared/components/RupiahInput.jsx";
import {createProductAction} from "../../../../redux/actions/productAction.js";
import {parseRupiahIntoString} from "../../../../shared/utils/currencyUtil.js";
import BasicSelect from "../../../../shared/components/BasicSelect.jsx";
import {PlusIcon} from "@heroicons/react/16/solid/index.js";
import {XMarkIcon} from "@heroicons/react/24/outline/index.js";

const ModalForm = forwardRef(
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
                images: [{image: null}]
            }
        })
        const dispatch = useDispatch();
        const [previews, setPreviews] = useState([]);
        const {isSubmitting} = useSelector(state => state.ui);
        const {categories} = useSelector(state => state.categories);
        const {stores} = useSelector(state => state.stores);

        const {fields, append, remove} = useFieldArray({
            control: control,
            name: 'images',
        });

        const handleFileChange = (index, file) => {
            const updatedPreviews = [...previews];
            if (file) {
                updatedPreviews[index] = URL.createObjectURL(file);
                setPreviews(updatedPreviews);
            } else {
                updatedPreviews[index] = null;
                setPreviews(updatedPreviews);
            }
        }

        const onSubmit = handleSubmit(async (formValues) => {
            const data = {
                ...formValues,
                price: parseRupiahIntoString(formValues.price),
                images: formValues.images ? formValues.images.flatMap(value => value.image) : null,
            }
            console.log('Data being sent:', data);
            dispatch(createProductAction({
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
                                label="Product Name"
                                name="name"
                                placeholder="Product Name..."
                                variant={'text'}
                                error={errors.name}
                            />

                            <TextInput
                                className={"flex flex-col"}
                                control={control}
                                label="Stock"
                                name="stock"
                                placeholder="0"
                                type='number'
                                variant={'number'}
                                error={errors.stock}
                            />

                            <RupiahInput
                                className={"flex flex-col"}
                                control={control}
                                label="Price"
                                name="price"
                                variant={'text'}
                                error={errors.price}
                            />

                            <BasicSelect
                                name={"category"}
                                control={control}
                                required
                                error={errors.category}
                                label={"Category"}
                                helperText={"Select the Category"}
                                placeholder={"Select Category..."}
                                options={
                                    categories.map((category) => ({
                                        label: `${category.name}`,
                                        value: category.id,
                                    }))
                                }
                            />

                            <BasicSelect
                                name={"store"}
                                control={control}
                                required
                                error={errors.store}
                                label={"Store"}
                                helperText={"Select the Store"}
                                placeholder={"Select Store..."}
                                options={
                                    stores.map((store) => ({
                                        label: `${store.name}`,
                                        value: store.id,
                                    }))
                                }
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

                            <div>
                                <span className="block text-lg font-medium text-gray-700">Images</span>
                                {errors.images && (
                                    <small className="text-red-500">{errors.images.message}</small>
                                )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="relative">
                                        <Controller
                                            control={control}
                                            name={`images.${index}.image`}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <label
                                                    htmlFor={`image.${index}.image`}
                                                    className="border border-dashed rounded-md bg-gray-50 aspect-square w-full flex justify-center items-center duration-300 hover:scale-105 cursor-pointer transition-all overflow-hidden relative"
                                                >
                                                    <input
                                                        {...field}
                                                        accept="image/png, image/jpg, image/jpeg, image/webp"
                                                        hidden
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            field.onChange(file);
                                                            handleFileChange(index, file);
                                                        }}
                                                        value=""
                                                        type="file"
                                                        id={`image.${index}.image`}
                                                    />
                                                    {previews[index] ? (
                                                        <img
                                                            src={previews[index]}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <p className="text-gray-500 text-center">Select Image</p>
                                                    )}
                                                </label>
                                            )}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>

                                        {errors.images?.[index]?.image && (
                                            <small className="absolute bottom-0 left-0 right-0 text-red-500 text-xs text-center">
                                                {errors.images[index].image.message}
                                            </small>
                                        )}
                                    </div>
                                ))}

                                <div className="col-span-full flex">
                                    <Button
                                        className="flex items-center gap-2 px-4 py-2 border rounded-md bg-blue-800 text-white hover:bg-blue-900"
                                        type="button"
                                        onClick={() => append({ image: null })}
                                    >
                                        <PlusIcon className="w-5 h-5" />
                                        Add Image
                                    </Button>
                                </div>
                            </div>



                            <div className="flex gap-4 justify-end">
                                <Button btnType="secondary" variant="outlined" onClick={onClose}>
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

ModalForm.displayName = "Modal";

ModalForm.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    children: PropTypes.node,
    hasConfirm: PropTypes.bool,
    confirmTypeBtn: PropTypes.string,
    confirmBtnText: PropTypes.string,
}

export default ModalForm;