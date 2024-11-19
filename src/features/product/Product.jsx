import {useForm} from 'react-hook-form';
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {addProduct} from "../../redux/slices/hookSlices.js";
import {connect} from "react-redux";
import {productCategory} from "../../shared/utils/productCategory.js";


function Product(props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        },
    } = useForm();

    const [form, setForm] = useState({
        id: null,
        name: '',
        price: null,
        description: '',
        category: '',
    });

    const onSubmit = (data) => {
        setForm(data);

        if (!form.id) {
            props.addProduct({
                ...data,
                id: `${new Date().getTime()}`,
            })
        }
        reset();
    }

    useEffect(() => {
        console.log("updated data form state:", form)
    }, [form]);

    const {products} = props;
    return (
        <>
            <div className="flex flex-col justify-center bg-base-100">
                <div className="flex flex-col items-center justify-center my-4 ">
                    <form onSubmit={handleSubmit(onSubmit)}
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
                            {errors.description && <p className="mt-1 text-red-500 text-xs">{errors.description.message}</p>}
                        </label>
                        <label className="flex flex-col" htmlFor="price">
                            <span className="text-gray-700">Product Price</span>
                            <input
                                className="p-2 rounded-lg text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Add Price Product..."
                                {...register("price" , {required: 'product price is required!', min: {value: 500, message: 'product price must be at least 500'}})}/>
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

                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left border-b border-gray-300">#</th>
                        <th className="px-4 py-2 text-left border-b border-gray-300">Product Name</th>
                        <th className="px-4 py-2 text-left border-b border-gray-300">Description</th>
                        <th className="px-4 py-2 text-left border-b border-gray-300">Price</th>
                        <th className="px-4 py-2 text-left border-b border-gray-300">Category</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {
                        products.map((product, index) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-2 border-b border-gray-300">{index + 1}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.description}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.price}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.category}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}


const mapStateToProps = (state) => ({
    addProduct: addProduct,
    products: state.products.products,
})

const mapDispatchToProps = {
    addProduct,
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const HookWithConnect = withConnect(Product);

Product.propTypes = {
    selectedProduct: PropTypes.object,
    addProduct: PropTypes.func,
    products: PropTypes.array,
}

export default HookWithConnect;