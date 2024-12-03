import {useDispatch, useSelector} from "react-redux";
import {getProfileAction} from "../../../redux/actions/userAction.js";
import {useEffect} from "react";

function Profile() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getProfileAction());
    }, [dispatch]);

    return (
        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Field</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Value</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 text-sm text-gray-500">ID</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user?.id || "N/A"}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-sm text-gray-500">Username</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user?.username || "N/A"}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-sm text-gray-500">Role</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user?.role || "N/A"}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Profile;
