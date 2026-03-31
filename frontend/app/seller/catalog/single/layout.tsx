"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const isSelect = pathname.includes("select-category");
    const isAdd = pathname.includes("add");
    return (
        <div className="min-h-screen bg-(--bg-color)">
            <div className="px-6 py-4 bg-(--div-bg) shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">
                    Add Single Catalog
                </h2>
            </div>

            <div className="py-3 space-y-4">
                <div className="bg-white border-b border-gray-200 mb-4">
                    <div className="flex gap-8 px-4 text-sm relative">

                        <Link href="/seller/catalog/single/select-category" className={`relative py-3 flex items-center gap-2 font-medium border-b-2 ${isSelect
                            ? "text-indigo-600 border-indigo-600"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                            }`}>
                            <span className={`w-6 h-6 flex items-center justify-center text-xs rounded-full  ${isSelect
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-300 text-gray-700"
                                }`}>
                                1
                            </span>
                            Select Category
                        </Link>

                        <Link href="/seller/catalog/single/add" className={`py-3 flex items-center gap-2 font-medium border-b-2 ${isAdd
                            ? "text-indigo-600 border-indigo-600"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                            }`}>
                            <span className={`w-6 h-6 flex items-center justify-center text-xs rounded-full ${isAdd
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-300 text-gray-700"
                                }`}>
                                2
                            </span>
                            Add Product Details
                        </Link>

                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}
