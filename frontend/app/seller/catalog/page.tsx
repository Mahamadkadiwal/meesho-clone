import { Search } from 'lucide-react';
import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen bg-(--bg-color)">
            <div className="px-6 py-4 bg-(--div-bg) shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">
                    Upload Catalog,
                </h2>
            </div>

            <div className="py-3 space-y-4">

                <div className="bg-white shadow-sm p-3">
                    <div className="flex gap-2 mb-4">
                        <span className="text-sm text-(--text-color)">Have a unique product to sell? Choose from the options below</span>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <button className="catalog-btn">Add Catalog in bulk</button>
                        <Link href='/seller/catalog/single' className="catalog-normal-btn">Add Single Catalog</Link>
                    </div>
                    <div className="flex flex-col mb-3">
                        <h3 className="text-md font-medium">Overview</h3>
                        <div className="flex flex-wrap mt-1">
                            <div className="flex flex-col w-45 border rounded-l border-gray-300 shadow p-2">
                                <span className="text-(--text-color)">Total Uploads Done</span>
                                <span className="text-(--text-color) text-xl font-bold">0 </span>
                            </div>
                            <div className="flex flex-col w-45 border border-gray-300 shadow p-2">
                                <span className="text-(--text-color)">Using Bulk Uploads</span>
                                <span className="text-(--text-color) text-xl font-bold">0 </span>
                            </div>
                            <div className="flex flex-col w-45 border rounded-r border-gray-300 shadow p-2">
                                <span className="text-(--text-color)">Using Single Uploads</span>
                                <span className="text-(--text-color) text-xl font-bold">0 </span>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200">
                    <div className="flex border-b border-gray-200 text-sm">
                        <span className="px-4 py-2 border-b-2 border-indigo-600 text-indigo-600 font-medium cursor-pointer">
                            Bulk Uploads (1)
                        </span>
                        <span className="px-4 py-2 text-gray-600 cursor-pointer hover:text-gray-800">
                            Single Uploads (5)
                        </span>
                    </div>

                    <div className="flex gap-6 px-4 mt-2 border-b border-gray-300 text-sm relative">
                        <span className="relative -mb-px px-4 py-2 border border-gray-300 border-b-white bg-white text-indigo-600 font-medium rounded-t">
                            All
                        </span>
                        <span className="py-2 text-gray-600 hover:text-gray-800 cursor-pointer">Action Required (0)</span>
                        <span className="py-2 text-gray-600 hover:text-gray-800 cursor-pointer">QC in Progress (0)</span>
                        <span className="py-2 text-gray-600 hover:text-gray-800 cursor-pointer">QC Error (0)</span>
                        <span className="py-2 text-gray-600 hover:text-gray-800 cursor-pointer">QC Pass (1)</span>
                    </div>

                    <div className="px-4 py-3 flex justify-between items-center ">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <label>Filter by:</label>
                            <select className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                <option>Select Category</option>
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search By File Id"
                                className="pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <Search className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}
