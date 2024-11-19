import {ChevronLeftIcon} from "@heroicons/react/24/outline/index.js";
import {Link} from "react-router-dom";
import image500 from "../../assets/image500.jpeg"

function Page500() {
    return (
        <div className="flex bg-base-100 items-center justify-center gap-12 min-h-dvh">
            <img src={image500} height={500} width={500} alt="500" className="object-cover border border-blue-800"/>
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold">Oops, That our bad.</h1>
                <span className="text-xl font-bold">{"We're not exactly sure what happened, but our servers say something wrong"}</span>
                <Link to={"/dashboard"} className="flex w-fit gap-2 items-center bg-blue-800 px-4 py-2 rounded-full text-white active:bg-blue-700">
                    <ChevronLeftIcon className="size-5" />
                    <span>Go Home</span>
                </Link>
            </div>
        </div>
    );
}
export default Page500;