import {useForm} from "react-hook-form";
import {productCategory} from "../../../../shared/utils/productCategory.js";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "../../schema/index.js";
import {useDispatch} from "react-redux";

function ProductFormCreate() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        },
    } = useForm({
        mode: 'all',
        resolver: zodResolver(createSchema),
    });

    const dispatch = useDispatch();

    return (
        <>
            <div className="flex flex-col justify-center bg-base-100">
                <div className="flex flex-col items-center justify-center my-4 ">
                    <form
                          className="flex flex-col min-w-full bg-gray-100 rounded-lg gap-4 p-6">
                        <h1 className="text-2xl justify-start items-start font-semibold">
                            Products
                        </h1>
                        <label className="flex flex-col" htmlFor="name">
                            <span className="text-gray-700">Product Name</span>
                            <input className="p-2 rounded-lg text-sm"
                                   type="text"
                                   name="name"
                                   id="name"
                                   placeholder="Add Products Name..."
                                   {...register("name", {required: 'product name cannot be empty!'})}
                            />
                            {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>}

                        </label>
                        <label className="flex flex-col gap-1" htmlFor="description">
                            <span className="text-gray-700">Description</span>
                            <input className="p-2 rounded-lg text-sm"
                                   type="text"
                                   name="descripion"
                                   id="description"
                                   placeholder="Add Description..."
                                   {...register("description", {required: 'product description cannot be empty!'})}/>
                            {errors.description &&
                                <p className="mt-1 text-red-500 text-xs">{errors.description.message}</p>}
                        </label>
                        <label className="flex flex-col" htmlFor="price">
                            <span className="text-gray-700">Product Price</span>
                            <input
                                className="p-2 rounded-lg text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Add Price Product..."
                                {...register("price", {
                                    required: 'product price is required!',
                                    min: {value: 500, message: 'product price must be at least 500'}
                                })}/>
                            {errors.price && <p className="mt-1 text-red-500 text-xs">{errors.price.message}</p>}
                        </label>
                        <label className="flex flex-col" htmlFor="category">
                            <span className="text-gray-700">Category</span>
                            <select className="p-2 rounded-lg text-sm"
                                    name="text"
                                    id="category"
                                    {...register("category", {required: 'category is required!'})}>
                                <option value="">Select Categories</option>
                                {
                                    productCategory.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))
                                }
                            </select>
                            {errors.category && <p className="mt-1 text-red-500 text-xs">{errors.category.message}</p>}
                        </label>
                        <button className="py-2 px-1 text-gray-100 bg-blue-800 active:bg-blue-950 rounded-lg"
                                type="submit">
                            Submit
                        </button>
                    </form>
                </div>

            </div>

        </>
    );
}


export default ProductFormCreate;