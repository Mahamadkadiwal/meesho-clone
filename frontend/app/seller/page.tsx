import { FaFileDownload } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { RiFileCloseFill } from "react-icons/ri";

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="px-6 py-4 bg-(--div-bg) shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Welcome back,
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    Manage and grow your business with Meesho
                </p>
            </div>

            <div className="p-3 space-y-4">

                <div className="bg-white rounded-lg shadow-sm p-3">
                    <div className="flex gap-2 mb-4">
                        <div className="p-2 rounded-full bg-gray-300"><TbListDetails /></div>
                        <h3 className="text-lg font-medium ">To do list</h3>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <div className="w-52 border border-gray-300 rounded-md shadow">
                            <div className="flex items-center justify-around px-2 py-2">
                                <MdPendingActions className="text-(--text-color) text-3xl" />
                                <div className="flex flex-col ">
                                    <span className="text-(--text-color)">Pending Orders</span>
                                    <span className="text-(--text-color)">0 </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-52 border border-gray-300 rounded-md shadow">
                            <div className="flex items-center justify-around px-2 py-2">
                                <FaFileDownload className="text-(--text-color) text-3xl" />
                                <div className="flex flex-col ">
                                    <span className="text-(--text-color)">Download Labels</span>
                                    <span className="text-(--text-color)">0 </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-52 border border-gray-300 rounded-md shadow">
                            <div className="flex items-center justify-around px-2 py-2">
                                <RiFileCloseFill className="text-(--text-color) text-3xl" />
                                <div className="flex flex-col ">
                                    <span className="text-(--text-color)">Out of Stock</span>
                                    <span className="text-(--text-color)">0 </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-52 border border-gray-300 rounded-md shadow">
                            <div className="flex items-center justify-around px-2 py-2">
                                <FaFileDownload className="text-(--text-color) text-3xl" />
                                <div className="flex flex-col ">
                                    <span className="text-(--text-color)">Low Stock</span>
                                    <span className="text-(--text-color)">0 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-5 flex justify-between items-center">
                    <div>
                        <h4 className="text-green-600 font-semibold text-lg">
                            Grow your business with ads
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                            More ads. More visibility. More orders.
                        </p>

                        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md">
                            Create Campaign
                        </button>
                    </div>

                    <div className="w-32 h-32 bg-gray-200 rounded-md" />
                </div>

            </div>
        </div>
    );
}
