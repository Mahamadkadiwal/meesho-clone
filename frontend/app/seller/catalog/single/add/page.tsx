"use client";
import { addImages, removeImage } from "@/app/store/slices/catalogSlice";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {

    const images = useSelector(
        (state: RootState) => state.catalog.images
    );
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        dispatch(addImages(files));
        // setShowModal(true);
    };



    return (
        <>
            <div className="bg-white p-3">
                <div className="flex items-center gap-6 overflow-x-auto">

                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center cursor-pointer min-w-[80px]`}
                        >
                            <div onClick={() => setActiveIndex(i)} className="flex items-center gap-2">
                                <div className="w-14 h-14 rounded-md bg-gray-50 flex items-center justify-center">

                                    <Image
                                        src={URL.createObjectURL(img)}
                                        alt="preview"
                                        width={50}
                                        height={50}
                                        unoptimized
                                        className="object-contain rounded"
                                    />
                                </div>
                                <span className="text-xs mt-1 text-gray-700">
                                    Product {i + 1}
                                </span>
                            </div>
                            {activeIndex === i && (
                                <div className="w-full h-0.5 bg-indigo-600 mt-1 rounded" />
                            )}
                        </div>
                    ))}

                    {images.length < 9 && (
                        <label className="flex flex-col items-center cursor-pointer min-w-[80px]">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-indigo-600 text-xl">
                                    +
                                </div>
                                <span className="text-xs mt-1 text-gray-600">Add Product</span>
                            </div>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                hidden
                                onChange={handleFileChange}
                            />
                        </label>
                    )}
                </div>
            </div>

            <div className="bg-white p-3">
                <div className="flex justify-between">
                    <h3 className="text-md font-medium">Add Product Details</h3>
                    <div className="flex gap-2 items-center text-indigo-600 cursor-pointer">
                        <MdDeleteOutline />
                        <span>Delete this product from catalog</span>
                    </div>
                </div>
            </div>
        </>
    )
}
